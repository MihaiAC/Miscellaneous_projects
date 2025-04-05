# Slightly modified solution to https://adventofcode.com/2024/day/21

from typing import Dict, Tuple, List
from functools import cache


class Solution:
    def __init__(self, inputs: List[str]):
        self.init_constants()
        self.inputs = inputs

        self.NUMPAD_SCHEMA = self.precompute_shortest_route(
            self.NUMPAD, self.NUMPAD_AVOID
        )
        self.DIRECTIONAL_SCHEMA = self.precompute_shortest_route(
            self.DIRECTIONAL, self.DIRECTIONAL_AVOID
        )

    def init_constants(self):
        self.DELTA_TO_SYM = {
            (-1, 0): "^",
            (1, 0): "v",
            (0, 1): ">",
            (0, -1): "<",
            (0, 0): "",
        }
        self.SIGN = lambda x: 0 if x == 0 else 1 if x > 0 else -1

        self.NUMPAD = [
            ["7", "8", "9"],
            ["4", "5", "6"],
            ["1", "2", "3"],
            ["#", "0", "A"],
        ]
        self.NUMPAD_AVOID = (3, 0)

        self.DIRECTIONAL = [["#", "^", "A"], ["<", "v", ">"]]
        self.DIRECTIONAL_AVOID = (0, 0)

    def precompute_shortest_route(
        self, matrix: List[List[str]], avoid: Tuple[int, int]
    ) -> Dict[Tuple[str, str], str]:
        M, N = len(matrix), len(matrix[0])
        routes = dict()

        def move_alongside_row(delta):
            return self.DELTA_TO_SYM[(0, self.SIGN(delta))] * abs(delta)

        def move_alongside_col(delta):
            return self.DELTA_TO_SYM[(self.SIGN(delta), 0)] * abs(delta)

        for ii in range(M):
            for jj in range(N):
                if matrix[ii][jj] == "#":
                    continue
                for kk in range(M):
                    for ll in range(N):
                        if matrix[kk][ll] == "#":
                            continue

                        if (ii, jj) == (kk, ll):
                            routes[(matrix[ii][jj], matrix[ii][jj])] = "A"
                            continue

                        route = ""

                        dx = kk - ii
                        dy = ll - jj

                        if dx == 0 or dy == 0:
                            route = (
                                self.DELTA_TO_SYM[(self.SIGN(dx), 0)] * abs(dx)
                                + self.DELTA_TO_SYM[(0, self.SIGN(dy))] * abs(dy)
                                + "A"
                            )
                        else:
                            """
                            Obviously, we want to minimize the changes in directions.
                            We can reach any cell from any other cell with a maximum of 1 direction change.
                            (
                            ii, ll) == avoid or (kk, jj) == avoid => only one path that doesn't pass through the free space;

                            Shortcut rules:
                            Expansion length (cost function): Moves (order interchangeable)
                            2: (v, ^), (v, <), (v, >), (^, A), (>, A)
                            3: (<, ^), (v, A), (>, ^), (<, >)
                            4: (<, A)

                            Based on these, let's consider the nontrivial (dx > 0 and dy > 0) cases when choosing the transitions.
                            Moving top left: moving left then up (<^) vs moving up then left (^<): we prefer <^, since ^< will end with <A which has a maximum cost of 4
                            Moving bottom left: v< (cost 4) vs <v (cost 3) we prefer <v for the same reasoning as above
                            Moving bottom right: v> (cost 2) vs >v (3)
                            Moving top right: ^> (cost 2) vs >^ (cost 2) => tiebreaker; ending in ">" is preferrable, since it's on the same line with two other buttons.
                            """

                            if (ii, ll) != avoid and (kk, jj) != avoid:
                                if ll < jj:
                                    # move alongside row first, then alongside column
                                    route = (
                                        move_alongside_row(dy)
                                        + move_alongside_col(dx)
                                        + "A"
                                    )
                                elif kk > ii:
                                    # move down the column then right
                                    route = (
                                        move_alongside_col(dx)
                                        + move_alongside_row(dy)
                                        + "A"
                                    )
                                else:
                                    route = (
                                        move_alongside_col(dx)
                                        + move_alongside_row(dy)
                                        + "A"
                                    )
                            elif (ii, ll) != avoid:
                                route = (
                                    move_alongside_row(dy)
                                    + move_alongside_col(dx)
                                    + "A"
                                )
                            elif (kk, jj) != avoid:
                                route = (
                                    move_alongside_col(dx)
                                    + move_alongside_row(dy)
                                    + "A"
                                )

                        routes[(matrix[ii][jj], matrix[kk][ll])] = route

        return routes

    def expand_code(self, combo_schema: Dict[Tuple[str, str], str], code: str) -> str:
        new_code = []
        for idx in range(len(code) - 1):
            transition = (code[idx], code[idx + 1])
            new_code.append(combo_schema[transition])
        return "".join(new_code)

    @cache
    def expand_return_code_len(self, code: str, repeats: int) -> int:
        if repeats == 0:
            return len(code)
        if "A" in code:
            mini_codes = code.split("A")[:-1]
            final_code_len = 0
            for mini_code in mini_codes:
                final_code_len += self.expand_return_code_len(
                    self.expand_code(self.DIRECTIONAL_SCHEMA, "A" + mini_code + "A"),
                    repeats - 1,
                )
            return final_code_len
        else:
            raise ValueError(f"expand_return_code_len: A not in code {code}")

    def calculate_final_code_len(self, code: str, repeats: int) -> int:
        code = self.expand_code(self.NUMPAD_SCHEMA, "A" + code)
        return self.expand_return_code_len(code, repeats)

    def calculate_complexity(self, repeats: int) -> int:
        complexity = 0
        for code in self.inputs:
            x = int(code[:-1])
            y = self.calculate_final_code_len(code, repeats)
            complexity += x * y
        return complexity


if __name__ == "__main__":
    sol = Solution("input")
    print(sol.calculate_complexity(25))
