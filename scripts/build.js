#!/usr/bin/env node

const getChangedList = require('./_lib/getChangedList');
const { execSync } = require('child_process');
const { exit } = require('process');

const list = getChangedList();

for (let { name } of list) {
  console.log(`build ${name}...`);
  try {
    execSync(`yarn workspace ${name} run build`);
  } catch (error) {}
}
exit();
