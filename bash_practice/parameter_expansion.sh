param=SomeWord
if [[ -n "$1" ]]; then
    param=$1
fi

# First char to uppercase.
echo "\${parameter^}: ${param^}"

# All chars to uppercase.
echo "\${parameter^^}: ${param^^}"

# First char to lowercase.
echo "\${parameter,}: ${param,}"

# All chars to lowercase.
echo "\${parameter,,}: ${param,,}"

# Number of characters in param.
echo "\${#parameter}: ${#param}"

# Substring.
echo "\${#parameter:offset:length}: ${param:2:5}"

echo
echo "--------------------------------------"
# Sample URL.
url="https://example.org/login?user=hunter2"
echo "\$url=$url"

# ${parameter#pattern} = removes the shortest string that matches
# the pattern if it's at the start of the value.
echo "\${url#*/}: ${url#*/}"

# Same as above, but removes the longest match;
echo "\${url##*/}: ${url##*/}"

# Removes shortest match at the end of the string.
echo "\${url%/*}: ${url%/*}"

# Same as above, but longest string.
echo "\${url%%/*}: ${url%%/*}"

# Replace the first match with the replacement.
echo "\${url/example/google}: ${url/example/google}"

# Replace each match with the replacement.
echo "\${url//./ }: ${url/./ }"

# Replace match at the beginning of the value.
echo "\${url/#https/http}: ${url/#https/http}"

# Replace match at the end of the value.
echo "\${url/%hunter2/firstpetname}: ${url/%hunter2/firstpetname}"


exit 0