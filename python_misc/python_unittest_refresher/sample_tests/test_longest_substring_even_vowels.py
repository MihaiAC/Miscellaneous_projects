import unittest
from random import randint
from sample.longest_substring_even_vowels import Solution

class TestSolution(unittest.TestCase):
    def setUp(self) -> None:
        self.solution = Solution()
        self.consonants = "bcdfghjklmnpqrstvwxyz"
        self.MAX_LEN = 5 * 10**5
        return super().setUp()
    
    def tearDown(self) -> None:
        del self.solution
        del self.consonants
        del self.MAX_LEN
        return super().tearDown()
    
    def test_solution_empty_string(self):
        self.assertEqual(self.solution.findTheLongestSubstring(""), 0)

    def test_solution_no_vowels(self):
        for _ in range(10):
            str_len = randint(1, self.MAX_LEN)
            random_string = "".join([self.consonants[randint(0, len(self.consonants)-1)] for _ in range(str_len)])
            self.assertEqual(self.solution.findTheLongestSubstring(random_string), str_len)

    def test_solution_more_than_two_vowels(self):
        self.assertEqual(self.solution.findTheLongestSubstring("eleetminicoworoep"), 13)
        self.assertEqual(self.solution.findTheLongestSubstring("leetcodeisgreat"), 5)
        

if __name__ == '__main__':
    unittest.main(failfast=False)