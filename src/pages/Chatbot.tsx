
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonalIcon } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const suggestedPrompts = [
  // "Gợi ý thực đơn eat clean cho gia đình 4 người",
  // "Thực đơn 3 bữa cho 2 người trong 1 tuần",
  // "Gợi ý nấu ăn với cà rốt và bông cải xanh",
  // "Làm salad với rau củ theo mùa",
  "Mình muốn mua rau sạch cho 2 người ăn trong 3 ngày thì bên bạn có gói nào phù hợp không?",
  "Mình muốn mua rau sạch cho 2 người ăn trong 3 ngày thì bên bạn có gói nào phù hợp không",
  "Combo đó gồm những loại rau gì",
  "Rau này lấy từ đâu? Có đảm bảo sạch không",
  "Có được chọn rau theo sở thích không",
  "Mình muốn có:các loại rau xanh, củ và tinh bột",
  "Mình đồng ý combo đó. Giao như thế nào",
  "Nguyễn Thị Ngọc, Số 7 ngách 30 ngõ 68 Xuân Thủy Cầu Giấy, 0922407744",


];

const botResponses: Record<string, string> = {



  "Mình muốn mua rau sạch cho 2 người ăn trong 3 ngày thì bên bạn có gói nào phù hợp không?": `Chào bạn 👋 Green Fresh hiện có Combo Rau Sạch 3 Ngày dành cho 2 người, 
được thiết kế theo khẩu phần chuẩn Eat Clean, đầy đủ dinh dưỡng, tiện lợi và an toàn.`,

  "Mình muốn mua rau sạch cho 2 người ăn trong 3 ngày thì bên bạn có gói nào phù hợp không": `Chào bạn 👋 Green Fresh hiện có Combo Rau Sạch 3 Ngày dành cho 2 người, 
được thiết kế theo khẩu phần chuẩn Eat Clean, đầy đủ dinh dưỡng, tiện lợi và an toàn.`,

  "Combo đó gồm những loại rau gì": `Combo tuần này gồm khoảng 6–8 loại rau tươi theo mùa, ví dụ:
  * Cải ngọt, súp lơ xanh, cải bó xôi
  * Dưa leo, mướp hương, cà chua bi, rau dền đỏ
Trọng lượng: 3.5–4kg, đủ cho 2 người ăn trong 3 ngày.`,

  "Rau này lấy từ đâu? Có đảm bảo sạch không": `Tất cả rau trong combo đều có nguồn gốc minh bạch.Canh tác theo quy trình không thuốc trừ sâu hóa học, không chất bảo quản, đảm bảo đạt chứng nhận VietGAP.
`,


  "Có được chọn rau theo sở thích không": `Đó là combo mình gợi ý sẵn nếu bạn muốn tiết kiệm thời gian lựa chọn. Nhưng nếu bạn không thấy phù hợp, bạn hoàn toàn có thể chuyển sang Combo Tự Chọn theo sở thích riêng nhé 🧺
✨ Với combo này, bạn sẽ được tự thiết kế giỏ rau cho 3 ngày, vẫn đảm bảo khẩu phần cho 2 người.
 Bạn chỉ cần nói cho mình biết những loại rau bạn muốn có trong combo của mình, ví dụ:
 – Thích ăn rau cải nhưng không ăn được mướp
 – Muốn có rau gia vị như thì là, tía tô
 – Ưu tiên rau ít đắng như rau lang, bí xanh
 Mình sẽ dựa vào đó để đề xuất giỏ rau phù hợp 💚`,


  "Mình muốn có:các loại rau xanh, củ và tinh bột": `Dựa theo sở thích bạn đưa ra, mình sẽ thiết kế combo tự chọn cho 2 người trong 3 ngày và thực đơn đi kèm để bạn tham khảo nấu cho từng bữa nhé:

Ngày 1: Khoai lang mật hấp,Dưa leo,cải ngọt ,Đỗ cove,Rau muống

Ngày 2: Khoai lang, cà rốt, bầu sao ,Cải ngồng,Khoai tây , Cải chíp

Ngày 3: Xà lách lolo + dưa leo,rau ngót,Bí xanh,Cải bẹ trắng
-----------------------------------------------------------------
🔸 Ngày 1
Bữa sáng
*Khoai lang mật hấp
*Trứng luộc
*Dưa leo thái lát

Bữa trưa
*Cơm trắng
*Canh cải ngọt nấu thịt băm
*Đỗ cove xào tỏi

Bữa tối
*Cơm trắng
*Rau muống xào bò 
*Cá chiên sả ớt
-----------------------------------------------------------------

🔸 Ngày 2
Bữa sáng
*háo khoai lang cà rốt
*Thịt gà xé phay

Bữa trưa
*Cơm trắng
*Canh bầu sao nấu tôm tươi
*Cải ngồng xào tỏi
*Khoai tây luộc

Bữa tối
*Cơm trắng
*Gà luộc chấm mắm gừng
*Cải chíp xào thịt lợn
-----------------------------------------------------------------
🔸 Ngày 3
*Bữa sáng
*Bánh mì ốp la
*Xà lách lolo + dưa leo trộn dầu giấm

Bữa trưa
*Cơm trắng
*Canh rau ngót nấu sườn lợn 
*Bí xanh xào thịt băm

Bữa tối
*Cơm trắng
*Cải bẹ trắng xào
*Tôm rim mặn ngọt

`,

  "Mình đồng ý combo đó. Giao như thế nào": `Sau khi bạn xác nhận đặt hàng, Green Fresh sẽ giao hàng tận nơi trong vòng 24 giờ.Bạn vui lòng cung cấp:
-Họ tên
-Địa chỉ
-Số điện thoại
`,


  "Nguyễn Thị Ngọc, Số 7 ngách 30 ngõ 68 Xuân Thủy Cầu Giấy, 0922407744": `Cảm ơn bạn đã cung cấp thông tin! Green Fresh sẽ giao hàng đến địa chỉ của bạn trong vòng 24 giờ. Bạn sẽ nhận được xác nhận đơn hàng qua tin nhắn sau khi đặt hàng thành công. Nếu có bất kỳ thay đổi nào về địa chỉ hoặc thông tin liên hệ, vui lòng thông báo cho chúng tôi nhé!`,





  "Gợi ý thực đơn eat clean cho gia đình 4 người": `Dưới đây là thực đơn Eat Clean cho gia đình 4 người trong 3 ngày:

**Ngày 1:**
- Bữa sáng: Sinh tố rau bina, chuối và yến mạch
- Bữa trưa: Salad gà nướng với rau xà lách, cà chua và dầu olive
- Bữa tối: Cá hồi nướng với măng tây và khoai lang

**Ngày 2:**
- Bữa sáng: Bánh mì nguyên cám với trứng luộc và bơ
- Bữa trưa: Bún trộn rau củ với đậu phụ
- Bữa tối: Gà nướng với rau củ theo mùa và quinoa

**Ngày 3:**
- Bữa sáng: Cháo yến mạch với hạt óc chó và táo
- Bữa trưa: Soup bí đỏ với bánh mì nguyên cám
- Bữa tối: Bò xào với bông cải xanh và cơm gạo lứt

Bạn có thể mua tất cả nguyên liệu tươi sạch từ GreenFresh để đảm bảo chất lượng tốt nhất cho gia đình.`,

  "Thực đơn 3 bữa cho 2 người trong 1 tuần": `Đây là thực đơn 3 bữa cho 2 người trong 1 tuần với nguyên liệu từ GreenFresh:

**Thứ 2:**
- Sáng: Bánh mì nguyên cám với trứng và bơ
- Trưa: Salad quinoa với rau củ và đậu gà
- Tối: Thịt gà nướng với khoai lang và rau củ

**Thứ 3:**
- Sáng: Sinh tố xanh với cải xoăn, chuối và sữa hạnh nhân
- Trưa: Bánh mì sandwich với hummus và rau củ
- Tối: Cá hồi nướng với măng tây và cơm gạo lứt

**Thứ 4:**
- Sáng: Overnight oats với hạt chia và quả mọng
- Trưa: Bún trộn rau củ với đậu phụ
- Tối: Thịt bò xào với bông cải xanh và cơm gạo lứt

**Thứ 5:**
- Sáng: Pancake chuối yến mạch
- Trưa: Soup bí đỏ với bánh mì nguyên cám
- Tối: Cá ngừ với salad và khoai tây

**Thứ 6:**
- Sáng: Sinh tố protein với chuối và bơ đậu phộng
- Trưa: Cơm trộn rau củ kiểu Hàn Quốc
- Tối: Thịt gà nướng với khoai lang và rau củ

**Thứ 7:**
- Sáng: Bánh mì nướng với bơ và trứng
- Trưa: Bánh wraps với hummus và rau củ
- Tối: Pasta nguyên cám với sốt cà chua và rau củ

**Chủ nhật:**
- Sáng: Granola với sữa chua và quả mọng
- Trưa: Salad Nicoise với trứng và cá ngừ
- Tối: Risotto nấm với rau chân vịt

Đây là thực đơn cân bằng dinh dưỡng giúp bạn có đủ năng lượng cho cả tuần. Bạn có thể đặt hàng tất cả nguyên liệu từ GreenFresh để đảm bảo độ tươi ngon.`,

  "Gợi ý nấu ăn với cà rốt và bông cải xanh": `Dưới đây là một số cách chế biến món ăn ngon với cà rốt và bông cải xanh:

**1. Salad cà rốt và bông cải xanh**
- Nguyên liệu: Cà rốt bào sợi, bông cải xanh cắt nhỏ, hạt điều, dầu olive, nước cốt chanh, mật ong, muối, tiêu
- Cách làm: Trộn cà rốt bào sợi với bông cải xanh cắt nhỏ. Làm sốt từ dầu olive, nước cốt chanh, mật ong, muối và tiêu. Trộn đều và rắc hạt điều lên trên.

**2. Súp kem cà rốt và bông cải xanh**
- Nguyên liệu: Cà rốt, bông cải xanh, hành tây, tỏi, nước dùng rau củ, kem tươi, muối, tiêu
- Cách làm: Xào hành tây và tỏi, thêm cà rốt và bông cải xanh, đổ nước dùng rau củ, nấu chín, xay nhuyễn và thêm kem tươi.

**3. Cà rốt và bông cải xanh xào tỏi**
- Nguyên liệu: Cà rốt, bông cải xanh, tỏi băm, dầu ăn, nước tương, đường, muối, tiêu
- Cách làm: Xào tỏi với dầu ăn, thêm cà rốt và bông cải xanh, nêm nước tương, đường, muối và tiêu.

**4. Pasta nguyên cám với cà rốt và bông cải xanh**
- Nguyên liệu: Pasta nguyên cám, cà rốt, bông cải xanh, hành tây, tỏi, dầu olive, phô mai parmesan, muối, tiêu
- Cách làm: Luộc pasta, xào hành tây và tỏi, thêm cà rốt và bông cải xanh, trộn với pasta và rắc phô mai.

Bạn có thể mua cà rốt và bông cải xanh chất lượng cao từ GreenFresh để có các món ăn ngon và giàu dinh dưỡng.`,

  "Làm salad với rau củ theo mùa": `Dưới đây là công thức làm salad với rau củ theo mùa:

**Salad Mùa Xuân**
- Nguyên liệu: Xà lách non, măng tây, đậu Hà Lan, củ cải đỏ, dưa leo
- Sốt: Dầu olive, nước cốt chanh, mật ong, muối, tiêu
- Topping: Hạt hướng dương, phô mai feta

**Salad Mùa Hè**
- Nguyên liệu: Cà chua, dưa leo, ớt chuông, hành tím, oliu
- Sốt: Dầu olive, giấm balsamic, oregano, muối, tiêu
- Topping: Phô mai mozzarella, lá húng quế

**Salad Mùa Thu**
- Nguyên liệu: Xà lách, táo, lê, quả óc chó, nam việt quất khô
- Sốt: Dầu olive, mù tạt Dijon, mật ong, muối, tiêu
- Topping: Phô mai xanh, hạt dẻ nướng

**Salad Mùa Đông**
- Nguyên liệu: Cải xoăn, bắp cải đỏ, cà rốt, củ dền, cam
- Sốt: Dầu olive, nước cốt cam, mật ong, muối, tiêu
- Topping: Hạt lựu, hạt bí nướng

**Bí quyết làm salad ngon:**
1. Rửa sạch rau củ và để ráo nước hoàn toàn
2. Cắt rau củ vừa ăn, không quá to hoặc quá nhỏ
3. Làm sốt riêng rồi mới trộn với salad
4. Nêm nếm vừa phải để giữ hương vị tự nhiên của rau củ
5. Thêm các loại hạt hoặc phô mai để tăng hương vị

GreenFresh cung cấp rau củ hữu cơ theo mùa giúp bạn có được salad ngon và giàu dinh dưỡng nhất!`
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Xin chào! Tôi là trợ lý ảo của GreenFresh. Tôi có thể giúp bạn gợi ý thực đơn Eat Clean dựa trên các sản phẩm tươi sạch của chúng tôi. Bạn muốn tôi gợi ý món gì cho bạn?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let responseText = '';

      // Check if the input matches any predefined responses
      for (const [key, value] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(key.toLowerCase())) {
          responseText = value;
          break;
        }
      }

      // If no match, generate a generic response
      if (!responseText) {
        responseText = `Cảm ơn bạn đã hỏi về "${input}". Tôi có thể gợi ý một số thực đơn Eat Clean phù hợp với nhu cầu của bạn. Vui lòng cho tôi biết số người và số bữa bạn muốn chuẩn bị để tôi có thể gợi ý chi tiết hơn.`;
      }

      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Chat với GreenFresh AI</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-250px)] flex flex-col">
          {/* Chat messages */}
          <ScrollArea className="flex-grow p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 rounded-lg p-3 ${message.sender === 'user'
                    ? 'bg-greenfresh-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  <div
                    className={`text-xs mt-1 ${message.sender === 'user' ? 'text-greenfresh-100' : 'text-gray-500'
                      }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Suggested prompts - hiện tạm ẩn */}
          {false && (
            <div className="p-4 border-t border-gray-200">
              <div className="mb-2">
                <span className="text-sm text-gray-500">Gợi ý:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}


          {/* Input area */}
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <Input
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="bg-greenfresh-600 hover:bg-greenfresh-700"
            >
              <SendHorizonalIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-greenfresh-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">GreenFresh</h3>
              <p className="text-greenfresh-200 mb-4">Rau sạch từ nông trại đến bàn ăn. Sản phẩm tươi mới mỗi ngày, đảm bảo chất lượng VietGAP.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Thông tin</h3>
              <ul className="space-y-2 text-greenfresh-200">
                <li>Về chúng tôi</li>
                <li>Chính sách giao hàng</li>
                <li>Điều khoản sử dụng</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-greenfresh-200">
                <li>Địa chỉ: 123 Đường ABC, Quận 1, TP HCM</li>
                <li>Email: info@greenfresh.vn</li>
                <li>Hotline: 1800-1234</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-greenfresh-700 mt-8 pt-4 text-center text-greenfresh-300">
            <p>© 2023 GreenFresh. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chatbot;
