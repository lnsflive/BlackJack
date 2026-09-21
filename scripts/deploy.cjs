const fs = require('node:fs');
const path = require('node:path');
const source = path.resolve(__dirname, '../dist');
const target = process.env.DEPLOY_DIR || '/volume1/web/games/blackjack';
if (!path.isAbsolute(target) || !target.startsWith('/volume1/web/') || target.split('/').includes('..') || target === '/volume1/web/') throw new Error('DEPLOY_DIR must name an application directory under /volume1/web');
if (!fs.existsSync(path.join(source, 'index.html'))) throw new Error('Build first: missing index.html');
if (fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink()) throw new Error('Refusing a symlink target');
console.log(`${source} -> ${target}`);
if (process.argv.includes('--preview')) process.exit(0);
const backup = path.resolve(__dirname, '../.deploy-backups', new Date().toISOString().replace(/[:.]/g, '-'));
if (fs.existsSync(target)) { fs.mkdirSync(path.dirname(backup), {recursive:true}); fs.cpSync(target, backup, {recursive:true}); console.log(`Backup: ${backup}`); }
fs.mkdirSync(target, {recursive:true});
// Keep previous hashed assets available for already-open pages. Never delete destination files.
fs.cpSync(source, target, {recursive:true});
console.log('Deployment copied successfully');
