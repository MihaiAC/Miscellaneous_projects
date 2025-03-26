import sys
import os

def convert_word_to_zero_length_list(word):
    ls = []
    # Convert each character into a zero-width sequence and save them into ls.
    for char in word:
        # Convert char to binary.
        binary_char = bin(ord(char))
        binary_char_strip = binary_char[2:]

        # A zero-width sequence will begin with a zero-width joiner.
        accumulator = u"\u200D"
        for digit in binary_char_strip:
            # Zeros are encoded with zero-width spaces.
            if(digit == '0'):
                accumulator += 	u"\u200B"
            # Ones are encoded with zero-width non-joiners.
            else:
                accumulator += 	u"\u200C"
        accumulator += u"\u200D"
        ls.append(accumulator)
    return ls

args = sys.argv
from_file_path = args[1]
to_file_path = args[2]
word_to_hide = args[3]

if(os.path.isfile(from_file_path) and len(word_to_hide) > 0):
    
    # Read input from file.
    f = open(from_file_path,'r')
    content = f.read()
    f.close()

    # Encode the word.
    ls = convert_word_to_zero_length_list(word_to_hide)

    # Preamble for iteration.
    step = int(len(content)/len(ls))
    offset = 0
    content = str(content)

    # Save each zero-width sequence corresponding to a character to a specific place in the input.
    # We can be smarter and save them semi-randomly but we'll keep it simple.
    for ii in range(len(ls)):
        index = ii * step + offset
        content = content[:index] + ls[ii] + content[index:]
        offset += len(ls[ii])

    # Overwrite old file with modified input.
    f = open(to_file_path,'wb')
    f.write(content.encode('utf-8'))
    f.close()
    
else:
    print('File could not be found or length of word to hide is 0.')