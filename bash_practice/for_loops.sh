((ii=2))
while ((ii >= 0))
do echo "while: $ii full cans"
((ii--))
done

for ((ii=0; ii<=3; ii++))
do echo "for: $ii full cans"
done

for ii in {3..0}
do echo "nicer_for: $ii full cans"
done