import cProfile
import pstats
from generate_inputs import generate_inputs
from keypad_conundrum import Solution

profiler = cProfile.Profile()
profiler.enable()
inputs = generate_inputs(10)
sol = Solution(inputs)
sol.calculate_complexity(300)
profiler.disable()

stats = pstats.Stats(profiler)

stats.strip_dirs().sort_stats("cumulative").print_stats(10)
stats.strip_dirs().sort_stats("calls").print_stats(10)
stats.strip_dirs().sort_stats("time").print_stats(10)

# 3619/10 - indicates a recursive function:
# - called 10 times at the top level;
# - called 3619 times in total;

# cumulative = total time spent in function + its calls
# tottime = time spent in the function itself
