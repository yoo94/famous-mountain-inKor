export default function Footer() {
    return (
        <footer className="bg-green-600 text-white text-center">
            <p>&copy; 2024 100대 명산. All rights reserved.</p>
            <nav className="mt-2">
                <ul className="flex justify-center space-x-4">
                    <li>
                        <a href="https://www.example.com/privacy" className="hover:underline">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="https://www.example.com/terms" className="hover:underline">
                            Terms of Service
                        </a>
                    </li>
                    <li>
                        <a href="https://www.example.com/contact" className="hover:underline">
                            Contact Us
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}
