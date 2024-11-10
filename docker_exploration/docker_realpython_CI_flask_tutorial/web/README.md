PROBLEM:
When creating the environment on Windows, Anaconda seems to install additional Windows specific packages. These get included in the environment.yml file even when exporting it with the --no-builds option with the following command:

conda env export --no-builds > environment.yml

These Windows specific packages cause building the Docker image to fail (since it's trying to download them in a Linux environment). 

SOLUTION:
The packages in the environment seem to have different dependencies depending on which OS you install them. Exporting the environment like this solves the issue: 

conda env export --from-history > environment.yml

