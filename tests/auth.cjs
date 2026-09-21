const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const game = 'blackjack';
const file = game === 'blackjack' ? '../pages/index.vue' : '../src/pages/Index.vue';
const source = fs.readFileSync(require('node:path').join(__dirname, file), 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/^import .*$/gm, '').replace('export default', 'module.exports =');
const requests = [];
let replies = [];
const call = async (method, url, body) => {
 requests.push({method,url,body});
 const result = replies.shift();
 if (result instanceof Error) throw result;
 return result;
};
const axios = {$get: u => call('GET',u), $post:(u,b)=>call('POST',u,b), $put:(u,b)=>call('PUT',u,b)};
const api = {get:async u=>({data:await call('GET',u)}),post:async(u,b)=>({data:await call('POST',u,b)}),put:async(u,b)=>({data:await call('PUT',u,b)})};
const context = {module:{exports:{}},Audio:function(){},defineComponent:x=>x,api,Notify:{create(){}},defaultApp:{},AppBar:{},clearInterval(){},Promise,console};
vm.runInNewContext(script, context);
const options=context.module.exports;
function instance(){const obj={...options.data(),$axios:axios,$nextTick:fn=>fn()};for(const [name,fn] of Object.entries(options.methods)) obj[name]=fn.bind(obj);return obj;}
function failure(status,error){return Object.assign(new Error('API failure'),{response:{status,data:{error}}});}
(async()=>{
 let app=instance();replies=[{user:{id:7}},game==='blackjack'?{id:11,name:'Returning',bank:'1234'}:{id:11,player:'returning',score:'500'},[]];
 await app.loadAccount();assert.equal(game==='blackjack'?app.playerName:app.username,game==='blackjack'?'Returning':'returning');assert.equal(game==='blackjack'?app.bankAmount:app.highScore,game==='blackjack'?1234:500);assert.throws(()=>app.applyProfile(game==='blackjack'?{bank:'invalid'}:{score:'invalid'}),/Invalid saved/);assert.ok(requests.some(r=>r.url===`/portfolio/games/${game}/me`));
 app=instance();replies=[failure(401)];await app.loadAccount();assert.equal(app.user,null);assert.equal(game==='blackjack'?app.userID:app.playerId,null);
 app=instance();replies=[{user:{id:7}},failure(404),[]];await app.loadAccount();assert.equal(app.user.id,7);assert.equal(game==='blackjack'?app.userID:app.playerId,null);
 app=instance();app.user={id:7};app.tempPlayer='Reserved';app.newName='Reserved';app.invalid=false;replies=[failure(409,'name_taken')];await (game==='blackjack'?app.submitPlayer():app.createPlayer());assert.match(app.authError,/reserved/);assert.equal(game==='blackjack'?app.userID:app.playerId,null);
 app=instance();app.user={id:7};app.userID=11;app.playerId=11;app.profileLoaded=true;app.highScore=900;replies=[{},[]];
 if (game==='blackjack') {options.watch.bankAmount.call(app,800);await app.saveQueue} else await app.postScore();
 const save=requests.find(r=>r.method==='PUT');assert.equal(save.url,`/portfolio/games/${game}/me`);assert.equal(save.body.id,undefined);assert.equal(save.body.user,undefined);
 assert.ok(!source.includes('localStorage.userID') && !source.includes("LocalStorage.getItem('playerid')"));
 console.log(`${game}: returning profile, unauthenticated gate, missing profile, reserved-name protection passed`);
})().catch(error=>{console.error(error);process.exit(1)});
