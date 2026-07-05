/**
 * YooKassa return target: https://fixactsport.org/payment/return
 *
 * Informational only. This page performs NO payment verification, NO backend
 * calls, and NO state mutation. After the user closes the in-app browser, the
 * FixAct Sport mobile app polls payment/attestation status itself. This page
 * exists solely to give YooKassa a valid HTTPS redirect target and to tell the
 * user to return to the app.
 */
export default function PaymentReturn() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-muted px-6"
      lang="ru"
    >
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Оплата обрабатывается
        </h1>
        <p className="mb-4 text-base text-muted-foreground">
          Если оплата уже завершена, вернитесь в приложение FixAct Sport. Статус
          попытки обновится автоматически.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Если окно оплаты было закрыто до завершения, откройте приложение и
          проверьте статус аттестации.
        </p>
        <a
          href="/"
          className="text-primary underline hover:text-primary/90"
        >
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}
