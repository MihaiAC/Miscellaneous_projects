br="\n------------------------------------------------\n"

# * = matches any kind of text
echo "ls * output:"
ls *
printf "$br"

# ? = matches any one single character.
echo "ls ?????_*"
ls ?????_*
printf "$br"

# [] = matches a single character inside the set
echo "ls [Rr]*"
ls [Rr]*
printf "$br"

# [[:classname:]] matches classes of characters
# e.g: alpha, ascii, alnum, blank, lower, upper, space, word
echo "ls [[:digit:]][[:digit:]]*"
ls [[:digit:]][[:digit:]]*
printf "$br"

