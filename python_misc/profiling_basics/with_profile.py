# Very similar to profiling with cProfile, but it's implemented in Python.
import profile
import pstats
from generate_inputs import generate_inputs
from keypad_conundrum import Solution

profiler = profile.Profile()
profiler.run(
    """
inputs = generate_inputs(10)
sol = Solution(inputs)
sol.calculate_complexity(300)
"""
)

stats = pstats.Stats(profiler)

stats.strip_dirs().sort_stats("cumulative").print_stats(10)
stats.strip_dirs().sort_stats("calls").dump_stats("calls_stats.stats")
stats.strip_dirs().sort_stats("time").print_stats(10)
