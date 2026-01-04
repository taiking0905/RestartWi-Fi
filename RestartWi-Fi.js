// Scriptable用
// ルータ再起動ボタン1つ化

const REBOOT_PAGE = "http://192.168.10.1/reboot.htm";
const REBOOT_POST = " http://192.168.10.1/boafrm/formReboot";

async function main() {
  try {
    // 1. GETしてSESSION_ID取得
    const html = await (await fetch(REBOOT_PAGE)).text();

    const match = html.match(
      /<input[^>]*(?:name=["']SESSION_ID["'][^>]*value=["']([^"']+)["']|value=["']([^"']+)["'][^>]*name=["']SESSION_ID["'])/
    );

    if (!match) {
      console.log("SESSION_ID が見つかりません");
      return;
    }

    const sessionId = match[1] || match[2];
    console.log("SESSION_ID:", sessionId);

    // 2. POST データ作成
    const body = `SESSION_ID=${sessionId}&reboot=再起動`;

    // 3. POST 送信（fetchなら古いHTTPも大体無視）
    try {
      await fetch(REBOOT_POST, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
        },
        body
      });
      console.log("再起動リクエスト送信完了");
    } catch (e) {
      console.log("POST エラー発生（古いルータ特有）ですが再起動は送信済みの可能性あり");
    }

  } catch (err) {
    console.error("全体エラー:", err);
  }
}

// 実行
main();
