br="\n------------------------------------------------\n"

# Outputs both the contents of dummy folder and error.
ls -l dummy_folder/ missing_folder/
printf "$br"

# Discard error output.
ls -l dummy_folder/ missing_folder/ 2>/dev/null
printf "$br"

# Incorrect: Redirect both outputs to incorrect.txt.
# Unpredictable output - on my system, stoud overwrites stderr.
ls -l dummy_folder/ missing_folder/ >incorrect.txt 2>incorrect.txt

# Correct: Redirect both outputs to correct.txt.
ls -l dummy_folder/ missing_folder/ >correct.txt 2>&1

# Incorrect again: stdout is not assigned yet.
# stderr is printed to terminal
ls -l dummy_folder/ missing_folder/ 2>&1 >incorrect.txt
printf "$br"

# Read input and display it.
echo "Reading input from correct.txt:"
var=$(<correct.txt) && echo "$var"
printf "$br"

# >> = appends instead of replacing.
# &> = redirects both stdout and stderr.
