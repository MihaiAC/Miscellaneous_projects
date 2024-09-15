from collections import defaultdict

class Solution:
    def findTheLongestSubstring(self, s: str) -> int:
        vowels = set(list("aeiou"))
        
        vowel_map = {
            'a': 1,
            'e': 2,
            'i': 4,
            'o': 8,
            'u': 16
        }

        prefix_first_idx = defaultdict(int)
        prefix_first_idx[0] = -1
        
        curr_prefix = 0
        longest_substring_length = 0
        
        for idx, char in enumerate(s):
            if char in vowels:
                curr_prefix ^= vowel_map[char]
            if curr_prefix in prefix_first_idx:
                longest_substring_length = max(longest_substring_length, idx-prefix_first_idx[curr_prefix])
            else:
                prefix_first_idx[curr_prefix] = idx
        
        return longest_substring_length
            
