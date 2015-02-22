# Contributing to Bubbles
This document will help through the process of contribution in the project.
While it is Bubbles-focused, it can be used to contribute in the other _Open Source_ projects as well.

## Fork
Fork the main project (i.e https://github.com/SametSisartenep/bubbles) and check out your copy.

```bash
$ git clone git@github.com:USERNAME/bubbles.git
$ cd bubbles
$ git remote add upstream git@github.com:SametSisartenep/bubbles.git
```

## Branch
Create a feature branch and start hacking:

```bash
$ git checkout -b your-feature-branch -t origin/master
```

When contributing, follow the guidelines specified in the [CODING_STYLE](CODING_STYLE.md) file.

## Commit
Make sure git knows your user name and email address:

```bash
$ git config --global user.name "USERNAME"
$ git config --global user.email "USEREMAIL"
```

Writing good commit logs is important. A commit log should describe what changed and why. Follow these guidelines when writing one:

1. The first line should be 50 characters or less and contain a short description of the change.
2. Keep the second line blank.
3. Wrap all other lines at 80 columns.

A good commit log looks like this:

```
explaining the commit in one line

Body of commit message is a few lines of text, explaining things
in more detail, possibly giving some background about the issue
being fixed, etc etc.

The body of the commit message can be several paragraphs, and
please do proper word-wrap and keep columns shorter than about
72 characters or so. That way `git log` will show things
nicely even when it is indented.
```

## Sync
Use `git rebase` (not `git merge`) to sync your work from time to time.

```bash
$ git fetch upstream
$ git rebase upstream/master
```

## Push
`$ git push -u origin your-feature-branch`

Go to https://github.com/USERNAME/bubbles and select your feature branch. Click the **Pull Request** button and fill out the form.
