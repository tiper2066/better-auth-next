import nodemailer from 'nodemailer';

// 새로운 통신객체 생성
export const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 이메일 전송 함수, 인자로 '받는메일, 제목, 내용'을 받음
export async function sendEmail({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}) {
    // 통신객체를 이용해서 이메일을 전송함
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        // 이메일 html 포맷 설정
        html: `
        <p>비밀번호 재설정을 요청한 경우.</p>
        <p>${text}</p>
      
        <p>만일 요청하지 않으셨다면 이 이메일을 무시해 주세요</p>
        `,
    });
}
