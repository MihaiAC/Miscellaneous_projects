from generate_inputs import generate_inputs
from keypad_conundrum import Solution
import timeit

inputs = generate_inputs(10)
sol = Solution(inputs)

execution_time = timeit.timeit(
    stmt="sol.calculate_complexity(25)", number=100, globals=globals()
)
print(f"Execution time: {execution_time} seconds")
