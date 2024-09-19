export default function Footer() {
    return (
        <footer className="bg-green-600 text-white py-6 mt-10">
            <p>&copy; 2024 Famous Mountain KOR. All rights reserved.</p>
            <nav className="mt-4">
                <ul className="flex justify-center space-x-6">
                    <li>
                        <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="/terms" className="hover:underline">Terms of Service</a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:underline">Contact Us</a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}
