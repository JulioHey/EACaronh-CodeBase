package email

import (
	"bytes"
	"embed"
	"fmt"
	"html/template"
	"net/smtp"
)

//go:embed templates
var tplFolder embed.FS

func SentOTPEmail(email, code string) error {
	from := "juliohey@gmail.com"
	to := []string{email}
	password := "fawzoasvfaiuidgq"

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)
	t, err := template.ParseFS(tplFolder, "templates/template.html")
	if err != nil {
		return err
	}

	var body bytes.Buffer

	mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body.Write([]byte(fmt.Sprintf("Subject: This is a test subject \n%s\n\n", mimeHeaders)))

	err = t.Execute(&body, struct {
		Email string
		Code  string
	}{
		Email: to[0],
		Code:  code,
	})
	if err != nil {
		return err
	}

	// Sending email.
	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, body.Bytes())
	if err != nil {
		fmt.Println(err)
		return err
	}
	fmt.Println("Email Sent!")
	return nil
}
