/**
 * @id codeql-zero-to-hero/3-3
 * @severity error
 * @kind problem
 */

import python
import semmle.python.ApiGraphs

from API::CallNode node
where
  node =
    API::moduleImport("flask").getMember("request").getMember("args").getMember("get").getACall() and
  node.getLocation().getFile().getRelativePath().regexpMatch("2/challenge-1/.*")
select node, "All Flask requests"
