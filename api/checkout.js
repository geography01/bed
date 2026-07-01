export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { bookId, amount } = req.body;

    // ⚙️ SWITCH GATEWAY FROM HERE ANYTIME
    const ACTIVE_GATEWAY = "razorpay"; 

    try {
        if (ACTIVE_GATEWAY === "razorpay") {
            return res.status(200).json({
                success: true,
                gateway: "razorpay",
                key: "rzp_test_YOUR_RAZORPAY_KEY", // अपनी लाइव/टेस्ट की यहाँ डालें
                orderId: "ord_secure_" + Math.random().toString(36).substring(2, 10),
                amount: amount * 100
            });
        } 
        else if (ACTIVE_GATEWAY === "payu") {
            return res.status(200).json({
                success: true,
                gateway: "payu",
                key: "YOUR_PAYU_MERCHANT_KEY",
                amount: amount
            });
        }
        else if (ACTIVE_GATEWAY === "jiopay") {
            return res.status(200).json({
                success: true,
                gateway: "jiopay",
                mid: "YOUR_JIO_MID",
                amount: amount
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
