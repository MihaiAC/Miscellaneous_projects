FROM continuumio/miniconda3

# Get + run updates.
RUN apt-get update && \
    apt-get upgrade --yes

# Create a user with fewer privileges and switch to it.
RUN useradd --create-home base_user
USER base_user
WORKDIR /home/base_user

# Copy env dependencies + create conda environment.
COPY --chown=base_user environment.yml ./
RUN conda env create --file=environment.yml

# Make RUN command use the conda environment.
SHELL ["conda", "run", "-n", "flask", "/bin/bash", "-c"]

# Activate conda environment and add it to PATH.
# RUN echo "source activate flask" > ~/.bashrc
# ENV PATH /opt/conda/envs/flask/bin:$PATH

# Copy app + test files.
COPY --chown=base_user page_tracker/ page_tracker/
COPY --chown=base_user test/ test/

# Run the tests + linters + static analysis tools.
# If any one of them returns a non-zero exit status code, 
# image will fail.

# For now, run only the unit tests.
RUN python -m pytest test/unit/
#    python -m flake8 page_tracker/ && \
#    python -m isort page_tracker/ && \
#    python -m black page_tracker/ --check --quiet && \
#    python -m bandit -r page_tracker/ --quiet
#   python -m pylint page_tracker/ --disable=C0114,C0116,R1705

EXPOSE 5000

# Run the flask app.
ENTRYPOINT ["conda", "run", "-n", "flask", \
    "flask", "--app", "page_tracker.app", "run", \
    "--host", "0.0.0.0", "--port", "5000"]

