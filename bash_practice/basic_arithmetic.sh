x=2
y=3
result=$((x**y+1))
echo $result

# Display decimals.
echo "scale=2; ($result)/2" | bc