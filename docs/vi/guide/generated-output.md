# Đầu ra được tạo

Một số gói pantoken xuất các tệp khi build — một stylesheet, một `theme.json`, một module token nhúng. Để giữ kho sạch và đầu ra trung thực, mọi gói đều theo một quy ước và một tác vụ workspace xác thực toàn bộ.

## Quy ước `generated/`

Mỗi gói tạo ra một artifact build ghi nó vào thư mục `generated/` theo từng gói, và không có gì khác sống ở đó. Một quy tắc trong `.gitignore` bao phủ tất cả:

```txt
**/generated/
```

Vì vậy không có tệp sinh ra nào được commit — một build tái tạo nó. Có hai loại đầu ra nằm ở đó:

- **Tệp tĩnh để phát hành** — các tệp mà người tiêu thụ import, chẳng hạn `@pantoken/css`'s `style.css` hoặc `@pantoken/scss`'s `tokens.scss`. Bản đồ `exports` của gói giữ khóa công khai (`"./style.css"`) nhưng trỏ nó tới `generated/`, vì vậy API cho người tiêu thụ không bao giờ thay đổi.
- **Các trung gian build** — các tệp mà mã nguồn của gói import và bundle vào `dist`, chẳng hạn JSON được vendored của `@pantoken/tokens`. Chúng không được phát hành riêng; chúng được biên dịch vào.

## Xác thực đầu ra

`@pantoken/validate-generated` (một công cụ riêng tư) chạy sau khi build và kiểm tra ba điều:

1. mỗi gói generator thực sự đã ghi một thư mục `generated/` không rỗng,
2. CLI `pantoken` xuất ít nhất một tệp cho mỗi target được hỗ trợ, và
3. không có stylesheet sinh ra nào bị lệch so với token IR — `danglingReferences` cho các sheet tự chứa,
   và `unknownReferences` cho các bridge chỉ tham chiếu tokens được định nghĩa ở nơi khác.

## Các lệnh

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Trình xác thực cũng được nối vào `pnpm run ready`, nên drift bị phát hiện trong gate tiêu chuẩn.
