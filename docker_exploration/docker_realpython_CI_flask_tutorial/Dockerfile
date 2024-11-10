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

# Activate conda environment and add it to PATH.
RUN echo "source activate flask" > ~/.bashrc
ENV PATH /opt/conda/envs/flask/bin:$PATH

# Copy app + test files.
COPY --chown=base_user page_tracker/ page_tracker/
COPY --chown=base_user test/ test/

# Run the tests + linters + static analysis tools.
# If any one of them returns a non-zero exit status code, 
# image will fail.
RUN python -m pytest test/unit/ && \
    python -m flake8 page_tracker/ && \
    python -m isort page_tracker/ && \
    python -m black page_tracker/ --check --quiet && \
    python -m bandit -r page_tracker/ --quiet
#   python -m pylint page_tracker/ --disable=C0114,C0116,R1705

# Run the flask app.
CMD ["flask", "--app", "page_tracker.app", "run", \
    "--host", "0.0.0.0", "--port", "5000"]

