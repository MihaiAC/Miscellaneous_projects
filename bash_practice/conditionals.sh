# Chaining command conditionally.
grep -q dummy 01_dummy.txt && echo "Success"
! grep -q nonexistent 01_dummy.txt && echo "Success again with not !"

a='Oblique wall'
b='Bisque chair'

# Basic if, don't forget to wrap variables in "".
# Don't forget to put spaces around [ content ].
if [ "$a" != "$b" ]; then
    echo "a is not the same as b"
else
    echo "a is the same as b"
fi

# [[ ]] -> more features than [ ].

# Pattern matching.
[[ $0 = *.sh ]] && echo "$0 looks like a .sh file"

# Auto-expands parameters, so "" are not needed**.
[[ $a != $b ]] && echo "a is not the same as b"

# ** If RHS not quoted => does pattern-matching.
foo=[a-z]*
name=alex
[[ $name = $foo ]] && echo "String $name matches pattern $foo"

# ** If RHS is quoted => matches literally.
[[ $name = "$foo" ]] && echo "String $name is not equal to string $foo"

# elif exists just like in Python
if [[ $name = "George" ]]; then
    echo "Hello $name"
elif [[ $name = "Hans" ]]; then
    echo "Hello $name"
else
    echo "You are not George or Hans"
fi

# Command : true if...
# -e : file exists
# -f : file is a regular file
# -d : file is a directory
# -h : symbolic link
# -p : pipe exists
# -r -w -x : if file is readable/writable/executable by you
# String operators: = != < >
# !EXPR = inverts expression
# Numeric: -eq -ne -lt -gt -le -ge

# [[ ]]: string = glob_pattern; string =~ REGEX