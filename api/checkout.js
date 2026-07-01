export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { bookId, amount } = req.body;

    // =================================================================
    // ⚙️ एडमिन कंट्रोलर (ADMIN GATEWAY CONTROLLER)
    // =================================================================
    // इन तीनों में से जो भी गेटवे आपको चालू रखना है, उसका नाम नीचे लिखें:
    // विकल्प: "razorpay" या "jiopay" या "upitranzact"
    
    const ACTIVE_GATEWAY = "razorpay"; 
    
    // =================================================================

    try {
        // 1. यदि रेजरपे एक्टिव है
        if (ACTIVE_GATEWAY === "razorpay") {
            return res.status(200).json({
                success: true,
                gateway: "razorpay",
                key: "rzp_test_YOUR_RAZORPAY_KEY", // यहाँ अपनी रेजरपे की डालें
                orderId: "ord_" + Math.random().toString(36).substring(2, 10),
                amount: amount * 100 // रेजरपे के लिए पैसों में (₹399 = 39900)
            });
        } 
        
        // 2. यदि जिओपे एक्टिव है
        else if (ACTIVE_GATEWAY === "jiopay") {
            return res.status(200).json({
                success: true,
                gateway: "jiopay",
                mid: "YOUR_JIO_MERCHANT_ID", // अपनी जियोपे मर्चेंट आईडी डालें
                amount: amount
            });
        }
        
        // 3. यदि UPITranzact एक्टिव है
        else if (ACTIVE_GATEWAY === "upitranzact") {
            return res.status(200).json({
                success: true,
                gateway: "upitranzact",
                vpa: "yourupihandle@ybl", // अपनी असली UPI ID (जैसे GPay/PhonePe की) यहाँ डालें
                merchantName: "B.ed ONE Store",
                amount: amount
            });
        }
        
        else {
            return res.status(400).json({ success: false, message: "No active gateway set" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
