import json
from pprint import pformat
import sys
import os

# Simple Python script which can extract the projects with the specified tags/difficulty from a
# JSON file which contains the masters projects (from my uni - cannot provide it here).

# Select the projects with the specified difficulty from data (which is a list of dictionaries).
def selectByDifficulty(data,difficulty):
        projects = []
        for project in data:
                if(project['difficulty'] == difficulty):
                        projects.append(project)
        return projects

# Select the projects with the specified tag from data.
def selectByTag(data,tag):
        projects = []
        for project in data:
                if(tag in project['tags']):
                        projects.append(project)
        return projects

# Select the projects with the specified tag and difficulty.
# If the tag or difficulty does not matter, it can be replaced with 'any'.
def selectProjects(data,tag,difficulty):
        if(difficulty == 'any'):
                return selectByTag(data,tag)
        if(tag == 'any'):
                return selectByDifficulty(data,difficulty)
        projects = []
        for project in data:
                if(project['difficulty'] == difficulty and (tag in project['tags'])):
                        projects.append(project)
        return projects

# Select only the titles of the projects contained in data.
def selectOnlyTheTitles(data):
        titles = []
        for project in data:
                titles.append(project['title'])
        return titles

# Select all project tags from the list of projects (without duplicates).
def selectAllTags(data):
        tags = []
        for project in data:
                for tag in project['tags']:
                        if tag not in tags:
                                tags.append(tag)
        return tags

# Function which prints the results of the query in the "results.txt" file.
# So far, args can contain either: 'OnlyTags' or two arguments (of which the first = tag, second = difficulty). 
# 'Incorrect arguments' is displayed otherwise (in Java this would be an error...).
def printFunction(data,args):
        if not os.path.exists('results.txt'):
                flag = 'xt'
        else:
                flax = 'wt'
        
        if(args[0] == 'OnlyTags'):
                with open('results.txt', 'wt') as g:
                       g.write(pformat(selectAllTags(data)))
        elif(len(args) == 2):
                with open('results.txt', 'wt') as g:
                       g.write(pformat(selectOnlyTheTitles(selectProjects(data,args[0],args[1]))))
        else:
                print('Incorrect arguments')
        

def main():
        with open('2017_01_25_project-list.json', 'r') as f:
                data = json.load(f)
        
        #If no arguments are provided, display 'Missing Arguments'.
        if(len(sys.argv) <= 1):
                print('Missing Arguments')
        else:
                printFunction(data,sys.argv[1:])


if __name__ == '__main__':
        main()