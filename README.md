# Matching PostHTML nodes by class name

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fposthtml-match-class.svg)](https://badge.fury.io/js/%40saekitominaga%2Fposthtml-match-class)
[![Build Status](https://app.travis-ci.com/SaekiTominaga/posthtml-match-class.svg?branch=main)](https://app.travis-ci.com/SaekiTominaga/posthtml-match-class)
[![Coverage Status](https://coveralls.io/repos/github/SaekiTominaga/posthtml-match-class/badge.svg)](https://coveralls.io/github/SaekiTominaga/posthtml-match-class)

This program is intended for use within a [PostHTML plugins](https://posthtml.org/#/plugins/).

## Methods

<dl>
<dt><code>contains(targetClassName: string): boolean</code></dt>
<dd>Whether the node contains the specified class name</dd>
<dt><code>remove(targetClassName: string): void</code></dt>
<dd>Remove the specified class name</dd>
<dt><code>refine(targetClassName: string): boolean</code></dt>
<dd>Refine node by specified class name</dd>
</dl>
