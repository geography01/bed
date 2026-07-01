export default async function handler(req, res) {
    // सिर्फ POST रिक्वेस्ट को अनुमति दें
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { bookId, amount } = req.body;

    // =================================================================
    // ⚙️ एडमिन कंट्रोलर (ADMIN GATEWAY CONTROLLER)
    // =================================================================
    // वर्तमान में आपने "upitranzact" (UPI Apps direct trigger) चालू किया है।
    // भविष्य में बदलने के विकल्प: "razorpay" या "jiopay" या "upitranzact"
    
    const ACTIVE_GATEWAY = "upitranzact"; 
    
    // =================================================================

    try {
        // 🟢 रूट 1: यदि बैकएंड में Razorpay चालू है
        if (ACTIVE_GATEWAY === "razorpay") {
            return res.status(200).json({
                success: true,
                gateway: "razorpay",
                key: "rzp_test_YOUR_RAZORPAY_KEY", // भविष्य में यहाँ लाइव/टेस्ट की डालें
                orderId: "ord_" + Math.random().toString(36).substring(2, 10),
                amount: amount * 100 // रेजरपे के लिए पैसों में गणना
            });
        } 
        
        // 🟢 रूट 2: यदि बैकएंड में JioPay चालू है
        else if (ACTIVE_GATEWAY === "jiopay") {
            return res.status(200).json({
                success: true,
                gateway: "jiopay",
                mid: "YOUR_JIO_MERCHANT_ID", // भविष्य में यहाँ जियो मर्चेंट आईडी डालें
                amount: amount
            });
        }
        
        // 🟢 रूट 3: यदि UPITranzact एक्टिव है (आपकी सेटिंग्स के अनुसार एक्टिवेटेड)
        else if (ACTIVE_GATEWAY === "upitranzact") {
            return res.status(200).json({
                success: true,
                gateway: "upitranzact",
                vpa: "rahul880250@ybl", // आपकी असली UPI ID जहाँ पैसे सीधे जमा होंगे
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
