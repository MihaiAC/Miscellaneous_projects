import python

from Function f
where
  f.getLocation().getFile().getRelativePath().regexpMatch("2/challenge-1/.*") and
  f.getName().regexpMatch(".*(command).*")
select f, "Function definition that has the string 'command' in its name"
