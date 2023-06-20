### Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe()

在 Node.js 6.0.0 之前的版本中，Buffer 实例是使用 Buffer 构造函数创建的，它根据提供的参数以不同的方式分配返回的 Buffer：

1. 将数字作为第一个参数传给 Buffer()（例如 new Buffer(10)）会分配指定大小的新 Buffer 对象;
   在 Node.js 8.0.0 之前，为此类 Buffer 实例分配的内存未初始化，并且可能包含敏感数据; 此类 Buffer 实例随后必须通过使用 buf.fill(0) 或在从 Buffer 读取数据之前写入整个 Buffer 来初始化。 虽然这种行为是为了提高性能，但开发经验表明，创建快速但未初始化的 Buffer 与创建速度较慢但更安全的 Buffer 之间需要更明确的区别。 从 Node.js 8.0.0 开始，Buffer(num) 和 new Buffer(num) 返回带有初始化内存的 Buffer;
2. 传入字符串、数组或 Buffer 作为第一个参数会将传入的对象的数据复制到 Buffer;
3. 传入 ArrayBuffer 或 SharedArrayBuffer 返回 Buffer，它与给定的数组缓冲区共享分配的内存.

    由于 new Buffer() 的行为因第一个参数的类型而异，因此当未执行参数验证或 Buffer 初始化时，可能会无意中将安全性和可靠性问题引入到应用程序中
    例如，如果攻击者可以使应用程序接收到预期为字符串的数字，则应用程序可能会调用 new Buffer(100) 而不是 new Buffer("100")，从而导致它分配 100 字节的缓冲区，而不是分配内容为 "100" 的 3 字节缓冲区。 这通常可以使用 JSON API 调用实现。 由于 JSON 区分数字和字符串类型，因此它允许在未充分验证其输入的天真编写的应用程序可能期望始终接收字符串的情况下注入数字。 在 Node.js 8.0.0 之前，100 字节的缓冲区可能包含任意预先存在的内存数据，因此可用于向远程攻击者公开内存机密。 从 Node.js 8.0.0 开始，不会发生内存暴露，因为数据是零填充的。 但是，其他攻击仍然是可能的，例如导致服务器分配非常大的缓冲区，导致性能下降或因内存耗尽而崩溃

    为了使 Buffer 实例的创建更可靠且更不容易出错，new Buffer() 构造函数的各种形式已被 deprecated 替换为单独的 Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe() 方法

是什么让 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() "不安全"？
调用 Buffer.allocUnsafe() 和 Buffer.allocUnsafeSlow() 时，分配的内存段未初始化（未清零）。 虽然这种设计使内存分配速度非常快，但分配的内存段可能包含可能敏感的旧数据。 使用由 Buffer.allocUnsafe() 创建的 Buffer 而没有完全覆盖内存可以让旧数据在读取 Buffer 内存时泄漏。

虽然使用 Buffer.allocUnsafe() 有明显的性能优势，但必须格外小心以避免将安全漏洞引入应用程序

###### 补充：Buffer 应用场景

文件操作：读取或写入文件时，可以使用 Buffer 来处理文件的二进制内容。
网络通信：当进行网络通信时，例如通过 HTTP、TCP 或 UDP 发送和接收数据，需要使用 Buffer 来处理二进制数据。
图像处理：在处理图像时，可以使用 Buffer 来读取、修改和写入图像的二进制数据。
加密和哈希算法：在进行加密和哈希操作时，需要使用 Buffer 来处理密钥、摘要和加密数据。
数据库操作：当与数据库进行交互时，可能需要使用 Buffer 来处理二进制数据类型，例如存储和检索图像、音频或视频等内容。
WebSocket 通信：在使用 WebSocket 进行双向实时通信时，需要使用 Buffer 来处理二进制数据的传输。
<这只是一些常见的情况，实际上，在处理任何需要操作二进制数据的场景中，都可以使用 Buffer 来进行处理。Buffer 提供了一种方便和高效的方式来处理二进制数据，并且在 Node.js 中广泛应用于各种领域。>
