import sys
import os

# Code is self-explanatory after reading encoder.py.
def extract_word(sequence):
    sw = 0
    accumulator = ''
    ls = []
    for char in sequence:
        if(char == u"\u200D"):
            if(sw == 0):
                sw = 1
            else:
                ls.append(accumulator)
                accumulator = ''
                sw = 0
        else:
            if(sw == 1):
                accumulator += char
    
    word = ''
    for element in ls:
        unicode_seq = ''
        for unicode_char in element:
            if(unicode_char == u"\u200B"):
                unicode_seq += '0'
            else:
                unicode_seq += '1'
        word += chr(int(unicode_seq,2))
    return word

args = sys.argv
from_file_path = args[1]

if(os.path.isfile(from_file_path)):
    # Read input from file.
    f = open(from_file_path,'r')
    content = f.read()
    f.close()

    # Extract the hidden word from the input (if it exists).
    print(extract_word(content))
    
else:
    print('File could not be found or length of word to hide is 0.')