files=( globs.sh sample.txt redirection )
echo "${files[@]}"
cat "${files[@]}"

# Parameter expansion for each array element:
names=( "Guy No" "Jo Go" "Go Jo" )
echo "${names[@]}"
echo
echo "Replacing space with _":
echo "${names[@]/ /_}"
echo
echo "Array slice:"
echo "${names[@]:1:2}"