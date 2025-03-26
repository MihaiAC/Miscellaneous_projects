PROBLEM:

I wanted to recreate my Windows Conda environment in the container.

When creating the environment on Windows, Anaconda seems to install additional Windows specific packages. These get included in the environment.yml file even when exporting it with the --no-builds option with the following command:

conda env export --no-builds > environment.yml

These Windows specific packages cause building the Docker image to fail (since it's trying to download them in a Linux environment).

SOLUTION:

Export only the explicit requirements (the ones manually installed with conda):

conda env export --from-history > environment.yml
