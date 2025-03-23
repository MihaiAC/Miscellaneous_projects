import python

from Call c
where c.getLocation().getFile().getRelativePath().regexpMatch("2/challenge-1/.*")
select c, "This is a function call"
