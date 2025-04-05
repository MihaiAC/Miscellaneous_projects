from typing import List
from random import randint


def generate_inputs(input_len: int) -> List[str]:
    inputs = []

    for _ in range(input_len):
        curr_input = ""
        for _ in range(3):
            curr_input += str(randint(0, 9))
        curr_input += "A"
        inputs.append(curr_input)

    return inputs
