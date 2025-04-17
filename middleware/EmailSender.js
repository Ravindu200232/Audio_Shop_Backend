import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ravindusubasinha082@gmail.com",
    pass: "mbvi tbqp spgl lmia", // use app password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendOrderConfirmationEmail(order) {
    const itemRows = order.orderItem
        .map(
            (item) => `
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">${item.product.name}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">$${item.product.price}</td>
                </tr>
            `
        )
        .join("");

    const mailOptions = {
        from: "ravindusubasinha082@gmail.com",
        to: order.email,
        subject: `🧾 Order Confirmation - Order #${order.orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #4CAF50;">Thank you for your order!</h2>
                <p>Hello,</p>
                <p>Your order <strong>#${order.orderId}</strong> has been received and is being processed.</p>
                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="padding: 8px; border: 1px solid #ddd;">Item</th>
                            <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
                            <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemRows}
                    </tbody>
                </table>

                <p><strong>Description:</strong> ${order.description}</p>
                <p><strong>Start Date:</strong> ${new Date(order.startingDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> ${new Date(order.endingDate).toLocaleDateString()}</p>
                <p><strong>Total Days:</strong> ${order.days}</p>
                <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>

                <hr />
                <p style="font-size: 14px; color: gray;">We'll notify you once your order is approved.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Order confirmation email sent to ${order.email}`);
    } catch (error) {
        console.error("❌ Error sending order confirmation email:", error);
    }
}
