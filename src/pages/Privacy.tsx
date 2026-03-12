import { Shield } from "lucide-react";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => { document.title = "Privacy — calc.rsvp"; }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>
      <div className="bg-card border rounded-lg p-6 space-y-4 text-sm leading-relaxed text-foreground">
        <p className="text-base font-medium">In plain English:</p>
        <p>calc.rsvp runs every calculation on your device — nothing you type is sent to our servers. We have no ads, no analytics trackers, and no data brokers.</p>
        <p>If you create an account, we store only your email and your list of saved favorites. We will never sell your data. Ever.</p>
        <h2 className="text-lg font-semibold pt-2">What we collect</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Account holders: email address and hashed password</li>
          <li>Account holders: list of favorited calculator IDs</li>
          <li>That's it. Nothing else.</li>
        </ul>
        <h2 className="text-lg font-semibold pt-2">What we don't do</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>No ads</li>
          <li>No third-party tracking scripts</li>
          <li>No cookies for tracking (only essential auth cookies)</li>
          <li>No selling or sharing of any data</li>
          <li>No marketing emails</li>
        </ul>
        <h2 className="text-lg font-semibold pt-2">Your calculations</h2>
        <p className="text-muted-foreground">All calculations run entirely in your browser using JavaScript. Your inputs never leave your device. Calculation history is stored in your browser's localStorage and can be cleared at any time.</p>
        <h2 className="text-lg font-semibold pt-2">Data deletion</h2>
        <p className="text-muted-foreground">You can delete your account at any time from the account page. This permanently removes all stored data.</p>
      </div>
    </div>
  );
}
