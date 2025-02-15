class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  /**
   * Checks if the TreeNode is a leaf.
   * @returns {boolean}
   */
  isLeaf() {
    return this.left === null && this.right === null;
  }

  /**
   * Triggers callback on the nodes, in-order.
   * @param {function} callback
   */
  inOrder(callback) {
    if (this.left !== null) {
      this.left.inOrder(callback);
    }

    callback(this.value);

    if (this.right !== null) {
      this.right.inOrder(callback);
    }
  }
}

class Tree {
  /**
   * Constructs a BST out of a given array of numbers.
   * @param {number[]} list
   */
  constructor(list) {
    let sortedList = Tree.sortRemoveDuplicates(list);
    this.root = Tree.buildTreeFromSortedList(sortedList);
  }

  /**
   * Returns the node containing value if it exists, null otherwise.
   * @param {number} value
   * @returns {TreeNode | null}
   */
  find(value) {
    let currNode = this.root;
    while (currNode !== null) {
      if (currNode.value === value) {
        return currNode;
      } else if (value > currNode.value) {
        currNode = currNode.right;
      } else {
        currNode = currNode.left;
      }
    }

    return null;
  }

  /**
   * Inserts value into the tree if it does not exist.
   * Returns true if successful, false otherwise.
   * @param {number} value
   * @returns {boolean}
   *
   */
  insert(value) {
    if (this.root === null) {
      this.root = TreeNode(value);
      return true;
    }

    let currNode = this.root;
    while (true) {
      if (currNode.value === value) {
        return false;
      }

      if (currNode.isLeaf()) {
        break;
      }

      if (currNode.value > value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }

    if (value < currNode.value) {
      currNode.left = new TreeNode(value);
    } else {
      currNode.right = new TreeNode(value);
    }

    return true;
  }

  /**
   * Deletes the node containing the given value, if it exists.
   * @param {number} value
   * @returns {boolean}
   */
  delete(value) {
    this.root = Tree.deleteAux(this.root, value);
  }

  /**
   * Returns the parent of the node containing given value.
   * @param {number} value
   * @returns {TreeNode}
   */
  findParent(value) {
    let currentNode = this.root;
    while (true) {
      if (currentNode.left !== null && currentNode.left.value === value) {
        return currentNode;
      }

      if (currentNode.right !== null && currentNode.right.value === value) {
        return currentNode;
      }

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  /**
   * Triggers callback on each tree node, in level order.
   * @param {function} callback
   */
  levelOrder(callback) {
    if (callback === null || typeof callback !== "function") {
      throw new Error("Tree.levelOrder - provided argument is not a callback!");
    }

    if (this.root === null) {
      return;
    }

    let currLevel = [this.root];
    while (currLevel.length > 0) {
      let newLevel = [];
      currLevel.forEach((node) => {
        callback(node);

        if (node.left !== null) {
          newLevel.push(node.left);
        }

        if (node.right !== null) {
          newLevel.push(node.right);
        }
      });
      currLevel = newLevel;
    }
  }

  /**
   * Triggers callback on each tree node, in order.
   * @param {*} callback
   */
  inOrder(callback) {
    if (callback === null || typeof callback !== "function") {
      throw new Error("Tree.levelOrder - provided argument is not a callback!");
    }

    if (this.root !== null) {
      this.root.inOrder(callback);
    }
  }

  rebalance() {
    let values = [];
    this.inOrder((value) => values.push(value));
    console.log(values);
    this.root = Tree.buildTreeFromSortedList(values);
  }

  /**
   * Checks if the tree is balanced.
   * @param {TreeNode} node
   * @returns {boolean}
   */
  static isBalanced(node) {
    if (node === null) {
      return true;
    }

    return (
      Math.abs(Tree.height(node.left) - Tree.height(node.right)) <= 1 &&
      Tree.isBalanced(node.left) &&
      Tree.isBalanced(node.right)
    );
  }

  /**
   * Returns the height of the given node.
   * @param {TreeNode} node
   * @returns {number}
   */
  static height(node) {
    if (node === null) {
      return 0;
    }

    return 1 + Math.max(Tree.height(node.left), Tree.height(node.right));
  }

  /**
   * Returns the depth of the given node within the root NodeTree.
   * root must contain node.
   * root and node must not be null.
   * @param {TreeNode} root
   * @param {TreeNode} node
   * @returns {number}
   */
  static depth(root, node) {
    if (root.value === node.value) {
      return 0;
    } else if (node.value < root.value) {
      return 1 + Tree.depth(root.left, node);
    } else {
      return 1 + Tree.depth(root.right, node);
    }
  }

  /**
   * Deletes the node containing the given value, if it exists.
   * Returns the modified tree root.
   * @param {TreeNode} root
   * @param {number} value
   */
  static deleteAux(root, value) {
    if (root === null) {
      return root;
    }

    if (root.value > value) {
      root.left = Tree.deleteAux(root.left, value);
    } else if (root.value < value) {
      root.right = Tree.deleteAux(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let successor = Tree.getSuccessor(root);
      console.log(successor.value);
      root.value = successor.value;
      root.right = Tree.deleteAux(root.right, root.value);
    }

    return root;
  }

  /**
   * Returns the leftmost leaf of the right subtree.
   * Root must not be None.
   * @param {TreeNode} root
   */
  static getSuccessor(root) {
    root = root.right;

    while (root !== null && root.left !== null) {
      root = root.left;
    }

    return root;
  }

  /**
   * Builds a tree from the provided sorted list.
   * @param {number[]} sortedList
   * @returns {TreeNode}
   */
  static buildTreeFromSortedList(sortedList) {
    if (sortedList.length == 0) {
      return null;
    } else if (sortedList.length == 1) {
      return new TreeNode(sortedList[0]);
    } else {
      let middle = Math.floor(sortedList.length / 2);
      return new TreeNode(
        sortedList[middle],
        Tree.buildTreeFromSortedList(sortedList.slice(0, middle)),
        Tree.buildTreeFromSortedList(sortedList.slice(middle + 1))
      );
    }
  }

  /**
   * Sorts and removes duplicates from the provided list.
   * Creates a new list.
   *
   * @param {number[]} list
   * @returns {number[]}
   */
  static sortRemoveDuplicates(list) {
    return Array.from(new Set(list)).sort((a, b) => a - b);
  }

  /**
   * Pretty prints the provided TreeNode.
   * @param {TreeNode} node
   * @param {string} prefix
   * @param {boolean} isLeft
   */
  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

let list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(list);
Tree.prettyPrint(tree.root);
console.log(Tree.isBalanced(tree.root));
// tree.levelOrder((node) => {
//   console.log(node.value + " ");
// });
tree.insert(68);
tree.insert(69);
tree.insert(70);
tree.insert(71);
console.log(Tree.isBalanced(tree.root));
tree.rebalance();
Tree.prettyPrint(tree.root);
tree.delete(70);
console.log(tree.root.value);
Tree.prettyPrint(tree.root);
