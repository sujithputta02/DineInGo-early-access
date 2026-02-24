/**
 * Foodie / User welcome email
 * Theme: Emerald green, playful, dino personality
 */
export function getUserWelcomeEmail(referralCode: string, position?: number, baseUrl?: string): string {
    const siteUrl = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:6173';
    const shareUrl = `${siteUrl}?ref=${referralCode}`;
    const positionText = position ? `#${position}` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're on the DineInGo List! 🦖</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header Card -->
          <tr>
            <td style="background:linear-gradient(135deg,#064e3b 0%,#065f46 50%,#047857 100%);border-radius:24px 24px 0 0;padding:48px 40px 32px;text-align:center;">
              <!-- DineInGo Logo Text -->
              <div style="margin-bottom:20px;">
                <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:42px;font-weight:900;letter-spacing:-1px;color:#ffffff;">
                  DineIn<span style="color:#34d399;">Go</span>
                </div>
              </div>
              <!-- Dino Emoji -->
              <div style="font-size:72px;line-height:1;margin-bottom:16px;">🦖</div>
              <p style="color:#6ee7b7;font-size:11px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin:0 0 16px;">DineInGo Early Access</p>
              <h1 style="color:#ffffff;font-size:40px;font-weight:900;margin:0 0 8px;line-height:1.1;">
                You're In, <span style="color:#34d399;">Foodie!</span> 🎉
              </h1>
              <p style="color:#a7f3d0;font-size:16px;font-weight:500;margin:0;line-height:1.5;">
                Dino is guarding your spot on the list.<br/>We'll roar when the doors open.
              </p>
            </td>
          </tr>

          <!-- Position Badge (if available) -->
          ${positionText ? `
          <tr>
            <td style="background:#111827;padding:20px 40px;text-align:center;">
              <div style="display:inline-block;background:linear-gradient(135deg,#064e3b,#065f46);border:2px solid #059669;border-radius:100px;padding:12px 28px;">
                <span style="color:#6ee7b7;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">Your Position</span>
                <div style="color:#34d399;font-size:36px;font-weight:900;line-height:1.1;">${positionText}</div>
              </div>
            </td>
          </tr>` : ''}

          <!-- Referral Code Card -->
          <tr>
            <td style="background:#111111;padding:32px 40px;">
              <div style="background:#0d1f17;border:2px solid #065f46;border-radius:20px;padding:28px;text-align:center;">
                <p style="color:#6ee7b7;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">🦖 Your Stomp Code</p>
                <div style="background:#000;border:2px dashed #047857;border-radius:12px;padding:16px 24px;margin:0 0 16px;display:inline-block;width:100%;box-sizing:border-box;">
                  <span style="color:#34d399;font-size:38px;font-weight:900;letter-spacing:8px;font-family:'Courier New',monospace;">${referralCode}</span>
                </div>
                <p style="color:#6b7280;font-size:14px;margin:0 0 20px;line-height:1.5;">
                  Share this code with friends &amp; move up the priority list.<br/>
                  Each friend who joins bumps you higher 🚀
                </p>
                <!-- Share Link Box -->
                <div style="background:#1a1a1a;border:1px solid #065f46;border-radius:12px;padding:12px 16px;word-break:break-all;">
                  <p style="color:#4b5563;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Share Link</p>
                  <p style="color:#34d399;font-size:13px;margin:0;word-break:break-all;">${shareUrl}</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- What to Expect -->
          <tr>
            <td style="background:#0d0d0d;padding:32px 40px;">
              <h2 style="color:#f9fafb;font-size:20px;font-weight:800;margin:0 0 20px;text-align:center;">What's waiting for you 🍽️</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px;">
                          <div style="width:36px;height:36px;background:#064e3b;border-radius:10px;text-align:center;line-height:36px;font-size:18px;">🤖</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="color:#f9fafb;font-size:15px;font-weight:700;margin:0 0 2px;">AI-Curated Dining</p>
                          <p style="color:#6b7280;font-size:13px;margin:0;">Personalized restaurant picks based on your taste</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px;">
                          <div style="width:36px;height:36px;background:#064e3b;border-radius:10px;text-align:center;line-height:36px;font-size:18px;">📅</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="color:#f9fafb;font-size:15px;font-weight:700;margin:0 0 2px;">Seamless Reservations</p>
                          <p style="color:#6b7280;font-size:13px;margin:0;">Book the best tables in seconds, no hassle</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px;">
                          <div style="width:36px;height:36px;background:#064e3b;border-radius:10px;text-align:center;line-height:36px;font-size:18px;">🌟</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="color:#f9fafb;font-size:15px;font-weight:700;margin:0 0 2px;">Exclusive Early Perks</p>
                          <p style="color:#6b7280;font-size:13px;margin:0;">Priority access, special offers &amp; founder badge</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="background:#0d0d0d;padding:0 40px 32px;text-align:center;">
              <a href="${shareUrl}" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#ffffff;font-size:16px;font-weight:800;padding:18px 40px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">
                🦖 Share &amp; Move Up the List
              </a>
            </td>
          </tr>

          <!-- Survey Section -->
          <tr>
            <td style="background:#0d0d0d;padding:32px 40px;">
              <div style="background:linear-gradient(135deg,#0d9488,#059669);border-radius:24px;padding:32px;text-align:center;">
                <div style="font-size:48px;margin-bottom:16px;">📋</div>
                <h3 style="color:#ffffff;font-size:24px;font-weight:900;margin:0 0 12px;">Help Shape DineInGo!</h3>
                <p style="color:#d1fae5;font-size:15px;margin:0 0 20px;line-height:1.6;">
                  Take our quick 1-2 minute survey and share your thoughts.<br/>
                  <strong style="color:#ffffff;">Your feedback helps us enhance DineInGo to better serve you.</strong>
                </p>
                <a href="https://tally.so/r/gD0ZLK" style="display:inline-block;background:#ffffff;color:#047857;font-size:15px;font-weight:800;padding:14px 32px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                  Take Survey Now →
                </a>
                <p style="color:#a7f3d0;font-size:12px;margin:16px 0 0;font-weight:600;">
                  Your input shapes the future of dining experiences
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#050505;border-radius:0 0 24px 24px;padding:28px 40px;text-align:center;">
              <p style="color:#374151;font-size:13px;margin:0 0 8px;">
                <strong style="color:#4b5563;">DineInGo</strong> · The Future of Dining
              </p>
              <p style="color:#374151;font-size:12px;margin:0;">
                📧 sec.dinelngo.team@gmail.com
              </p>
              <p style="color:#1f2937;font-size:11px;margin:12px 0 0;">
                You're receiving this because you signed up for DineInGo Early Access.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
