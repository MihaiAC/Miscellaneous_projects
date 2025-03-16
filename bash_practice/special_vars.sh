#!/bin/bash

echo "Special environment variables: "
echo "\$PATH: $PATH"
echo "\$HOME: $HOME"
echo "\$PWD: $PWD"

# Current logged-in username
echo "\$USER: $USER"

# Default shell path
echo "\$SHELL: $SHELL"

# Previous working directory
echo "\$OLDPWD: $OLDPWD"

# Default text editor
echo "\$EDITOR: $EDITOR"

# System language setting
echo "\$LANG: $LANG"

# Terminal type
echo "\$TERM: $TERM"

# User ID of the current user
echo "\$UID: $UID"

# Group ID of the current user
echo "\$GID: $(id -g)"

# An array variable containing the list of groups of which the current
# user is a member.
echo "\$GROUPS: $GROUPS"

# History number of the current command.
echo "\$HISTCMD: $HISTCMD"

# Display server in graphical environments
echo "\$DISPLAY: $DISPLAY"

# Name of the current machine
echo "\$HOSTNAME: $HOSTNAME"

# Current machine's CPU architecture.
echo "\$HOSTTYPE: $HOSTTYPE"

# Number of seconds since the Unix Epoch.
echo "\$EPOCHSECONDS: $EPOCHSECONDS"

# Random integer between 0 and 32767.
echo "\$RANDOM: $RANDOM"

# Version of Bash
echo "\$BASH_VERSION: $BASH_VERSION"

# Directory where Bash creates temporary files
# for the shell's use.
echo "\$TMPDIR: $TMPDIR"


echo
echo "-------------------------------"
echo

# Meta variables
echo "Meta variables"

# Script name
echo "\$0: $0"

# Number of arguments passed
echo "\$#: $#"

# All arguments as separate words
echo "\$@: $@"

# All arguments as a single string
echo "\$*: $*"

# Process ID of this script
echo "\$\$: $$"

# Exit status of the last command
echo "\$?: $?"

# Process ID of the last background command
echo "\$!: $!"

# Last argument of the last executed command
echo "\$_: $_"

# Seconds since script start
echo "\$SECONDS: $SECONDS"

# Current line number
echo "\$LINENO: $LINENO"

echo
echo "-------------------------------"
