__webpack_require__(437).config();
const core = __webpack_require__(186);
const github = __webpack_require__(438);
const { Octokit } = __webpack_require__(375);
const { sampleSize } = __webpack_require__(250);

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });

const context = github.context;
const owner = context.repo.owner;
const repo = context.repo.repo;

const REDARR = [...new Array(33).keys()].map((e,i,a) => a[i] = e +1);
const BLUEARR = [...new Array(16).keys()].map((e,i,a) => a[i] = e +1);

const TITLE = `
Shortened Link`;

async function main () {
  try {
    const issueNumber = context.payload.issue.number;
    const issueBody = context.payload.issue.body;

    const commentBody = context.payload.comment.body;
    const commentAuth = context.payload.comment['author_association'];
    let body = 'test';

    var tresrelinkconfirmrespond = true;
    var tresrelinkrespondoutput = tresreb2a(String(issueNumber + (10))).replace(/=/g, " ");
    function tresreb2a(a) {
      var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
      if (!a) return a;
      do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e, 
      f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
      return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
    }    
    body = ("https://tresre.dev/l/" + tresrelinkrespondoutput);
    if (tresrelinkconfirmrespond == true) {
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body
      });
    }

    function getBody (body) {
      let result = body;
      if (body.startsWith('/TCB')) {
        let number = body.split(' ')[1];
        if (number) {
          let r = '';
          for (let i = 0; i < number; i++) {
            let {red, blue} = getRedBlue();
            r += `| ${red[0]} ${red[1]} ${red[2]} ${red[3]} ${red[4]} ${red[5]} | ${blue[0]} |\n`
          }
          result = `${TITLE}\n${r}`;
        } else {
          let {red, blue} = getRedBlue();
          result = `${TITLE}\n| ${red[0]} ${red[1]} ${red[2]} ${red[3]} ${red[4]} ${red[5]} | ${blue[0]} |`;
        };
        return result;
      }
      return `${result} too`;
    };

    function getRedBlue () {
      let red = sampleSize(REDARR, 6);
      red.sort((a,b) => a - b);
      let blue = sampleSize(BLUEARR, 1);
      return { red, blue };
    };

  } catch (err) {
    core.setFailed(err.message);
  }
};

main();
