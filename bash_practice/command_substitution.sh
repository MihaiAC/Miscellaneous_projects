#$(command) runs the command in a subshell and returns the output.
echo "Sample text" > sample.txt
cat sample.txt
echo "The file <sample.txt> contains: $(cat sample.txt)"

# Display current time.
time=$(date +%H:%m:%S)
echo "The current time is: $time"