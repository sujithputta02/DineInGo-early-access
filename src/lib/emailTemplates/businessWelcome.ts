/**
 * Venue / Business welcome email
 * Theme: Gold/amber, professional, premium
 */
export function getBusinessWelcomeEmail(referralCode: string, position?: number, baseUrl?: string): string {
    const siteUrl = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:6173';
    const shareUrl = `${siteUrl}?ref=${referralCode}`;
    const positionText = position ? `#${position}` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Venue is on the DineInGo List!</title>
</head>
<body style="margin:0;padding:0;background:#0a0908;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0908;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header Card -->
          <tr>
            <td style="background:linear-gradient(135deg,#78350f 0%,#92400e 50%,#b45309 100%);border-radius:24px 24px 0 0;padding:48px 40px 32px;text-align:center;">
              <!-- DineInGo Business Logo -->
              <div style="margin-bottom:24px;">
                <div style="display:inline-block;">
                  <!-- DineInGo Text -->
                  <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:48px;font-weight:900;letter-spacing:-1px;margin-bottom:8px;">
                    <span style="color:#ffffff;">D</span><span style="color:#ffffff;position:relative;display:inline-block;">i<span style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:8px;height:8px;background-color:#ef4444;border-radius:50%;"></span></span><span style="color:#ffffff;">ne</span><span style="color:#ffffff;">I</span><span style="color:#ffffff;">n</span><span style="color:#fbbf24;">G</span><span style="color:#fbbf24;">o</span>
                  </div>
                  <!-- BUSINESS Text -->
                  <div style="font-size:14px;font-weight:700;letter-spacing:0.3em;color:#00F29D;font-family:'Poppins',Arial,sans-serif;">
                    BUSINESS
                  </div>
                </div>
              </div>
              <p style="color:#fcd34d;font-size:11px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin:0 0 16px;">DineInGo · Venue Partner Program</p>
              <h1 style="color:#ffffff;font-size:40px;font-weight:900;margin:0 0 8px;line-height:1.1;">
                Your Venue is <span style="color:#fbbf24;">Reserved!</span> 🎊
              </h1>
              <p style="color:#fde68a;font-size:16px;font-weight:500;margin:0;line-height:1.5;">
                You're among the first venues on DineInGo.<br/>We'll unlock your dashboard when we launch.
              </p>
            </td>
          </tr>

          <!-- Position Badge (if available) -->
          ${positionText ? `
          <tr>
            <td style="background:#111008;padding:20px 40px;text-align:center;">
              <div style="display:inline-block;background:linear-gradient(135deg,#78350f,#92400e);border:2px solid #d97706;border-radius:100px;padding:12px 28px;">
                <span style="color:#fcd34d;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">Venue Position</span>
                <div style="color:#fbbf24;font-size:36px;font-weight:900;line-height:1.1;">${positionText}</div>
              </div>
            </td>
          </tr>` : ''}

          <!-- Referral Code Card -->
          <tr>
            <td style="background:#111008;padding:32px 40px;">
              <div style="background:#1a1408;border:2px solid #92400e;border-radius:20px;padding:28px;text-align:center;">
                <p style="color:#fcd34d;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">🏅 Your Partner Code</p>
                <div style="background:#000;border:2px dashed #d97706;border-radius:12px;padding:16px 24px;margin:0 0 16px;display:inline-block;width:100%;box-sizing:border-box;">
                  <span style="color:#fbbf24;font-size:38px;font-weight:900;letter-spacing:8px;font-family:'Courier New',monospace;">${referralCode}</span>
                </div>
                <p style="color:#6b7280;font-size:14px;margin:0 0 20px;line-height:1.5;">
                  Refer other venues to move up the partner priority list.<br/>
                  Early partners get premium onboarding &amp; reduced fees.
                </p>
                <!-- Share Link Box -->
                <div style="background:#1a1a1a;border:1px solid #92400e;border-radius:12px;padding:12px 16px;word-break:break-all;">
                  <p style="color:#4b5563;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Share Link</p>
                  <p style="color:#fbbf24;font-size:13px;margin:0;word-break:break-all;">${shareUrl}</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- What's Coming -->
          <tr>
            <td style="background:#0d0c08;padding:32px 40px;">
              <h2 style="color:#f9fafb;font-size:20px;font-weight:800;margin:0 0 20px;text-align:center;">What powers your venue 🚀</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f1a0f;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px;">
                          <div style="width:36px;height:36px;background:#78350f;border-radius:10px;text-align:center;line-height:36px;font-size:18px;">🗺️</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="color:#f9fafb;font-size:15px;font-weight:700;margin:0 0 2px;">3D Floor Management</p>
                          <p style="color:#6b7280;font-size:13px;margin:0;">Manage tables, layouts &amp; guest flow in real-time</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1f1a0f;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:44px;">
                          <div style="width:36px;height:36px;background:#78350f;border-radius:10px;text-align:center;line-height:36px;font-size:18px;">📊</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="color:#f9fafb;font-size:15px;font-weight:700;margin:0 0 2px;">Smart Analytics</p>
                          <p style="color:#6b7280;font-size:13px;margin:0;">Bookings, revenue &amp; guest insights at a glance</p>
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
                          <div style="width:36px;height:36px;background:#78350f;border-radius:10px;text-align:center;line-height:36px;font-size:18px;">⭐</div>
                        </td>
                        <td style="padding-left:14px;">
                          <p style="color:#f9fafb;font-size:15px;font-weight:700;margin:0 0 2px;">Founder Partner Status</p>
                          <p style="color:#6b7280;font-size:13px;margin:0;">Reduced fees, badge &amp; premium support forever</p>
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
            <td style="background:#0d0c08;padding:0 40px 32px;text-align:center;">
              <a href="${shareUrl}" style="display:inline-block;background:linear-gradient(135deg,#d97706,#b45309);color:#ffffff;font-size:16px;font-weight:800;padding:18px 40px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">
                🏅 Refer a Venue &amp; Move Up
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#050401;border-radius:0 0 24px 24px;padding:28px 40px;text-align:center;">
              <p style="color:#374151;font-size:13px;margin:0 0 8px;">
                <strong style="color:#4b5563;">DineInGo</strong> · Next-Gen Restaurant Management
              </p>
              <p style="color:#374151;font-size:12px;margin:0;">
                📧 sec.dinelngo.team@gmail.com
              </p>
              <p style="color:#1f2937;font-size:11px;margin:12px 0 0;">
                You're receiving this because you registered as a venue partner for DineInGo Early Access.
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
