import tkinter as tk
from tkinter import scrolledtext, ttk, messagebox
import random
import time
import threading
import logging
from datetime import datetime

# Setup logging
logging.basicConfig(
    filename='cyber_hacker_simulator.log',
    level=logging.INFO,
    format='%(asctime)s [%(threadName)s] %(message)s'
)

class CyberHackerSimulator:
    def __init__(self, root):
        self.root = root
        self.root.title("🔑 N21 CyberHacker Simulator [EDUCATIONAL SIMULATION]")
        self.root.configure(bg='#0a0a0a')
        self.is_running = False
        self.stop_event = threading.Event()
        self.request_count = 0
        self.success_count = 0
        self.error_count = 0
        self.is_logged_in = False
        self.pulse_buttons = []
        self.attack_type = tk.StringVar(value="DDoS")
        self.attack_intensity = tk.DoubleVar(value=50.0)

        # Styling
        self.font = ("Consolas", 12)
        self.title_font = ("Consolas", 16, "bold")
        self.neon_green = "#00FF41"
        self.neon_red = "#FF3333"
        self.neon_cyan = "#00FFFF"
        self.neon_purple = "#FF00FF"
        self.neon_yellow = "#FFFF00"
        self.dark_gray = "#1a1a1a"
        self.solid_black = "#0a0a0a"

        self.show_loading_animation()

    def show_loading_animation(self):
        """Enhanced loading animation with cyberpunk effects"""
        self.loading_window = tk.Toplevel(self.root)
        self.loading_window.geometry("800x600+{}+{}".format(
            int(self.root.winfo_screenwidth()/2 - 400),
            int(self.root.winfo_screenheight()/2 - 300)
        ))
        self.loading_window.configure(bg='#0a0a0a')
        self.loading_window.overrideredirect(True)
        self.loading_canvas = tk.Canvas(self.loading_window, bg='#0a0a0a', highlightthickness=0)
        self.loading_canvas.pack(fill='both', expand=True)

        # Animated background grid
        for x in range(0, 800, 20):
            self.loading_canvas.create_line(x, 0, x, 600, fill='#1a3c34', dash=(2, 4))
        for y in range(0, 600, 20):
            self.loading_canvas.create_line(0, y, 800, y, fill='#1a3c34', dash=(2, 4))

        # Code rain
        self.code_rain_chars = []
        for x in range(0, 800, 15):
            y = random.randint(-200, 0)
            char = self.loading_canvas.create_text(x, y, text="", font=("Consolas", 10), fill=self.neon_green)
            self.code_rain_chars.append((char, x))
        self.animate_code_rain()

        # Loading text with glitch effect
        self.loading_text = self.loading_canvas.create_text(
            400, 500,
            text="⚡ Initializing N21 CyberHacker...\n[EDUCATIONAL SIMULATION]",
            font=("Consolas", 18, "bold"),
            fill=self.neon_cyan,
            justify='center'
        )
        self.glitch_loading_text()
        self.root.withdraw()
        self.root.after(5000, self.show_login_screen)

    def animate_code_rain(self):
        """Enhanced code rain animation"""
        if self.loading_window.winfo_exists():
            for char, x in self.code_rain_chars:
                y = self.loading_canvas.coords(char)[1]
                if y > 600:
                    y = random.randint(-200, 0)
                else:
                    y += random.randint(10, 25)
                self.loading_canvas.coords(char, x, y)
                text = ''.join(random.choice('01abcdef{}[]()=+-*/|&^%$#@!') for _ in range(1))
                self.loading_canvas.itemconfig(char, text=text, fill=random.choice([self.neon_green, self.neon_cyan]))
            self.loading_window.after(40, self.animate_code_rain)

    def glitch_loading_text(self):
        """Glitch effect for loading text"""
        if self.loading_window.winfo_exists():
            if random.random() < 0.4:
                glitch_text = ''.join(random.choice([c, chr(random.randint(33, 126))]) for c in self.loading_canvas.itemcget(self.loading_text, 'text'))
                self.loading_canvas.itemconfig(self.loading_text, text=glitch_text, fill=random.choice([self.neon_purple, self.neon_yellow]))
                self.loading_window.after(80, lambda: self.loading_canvas.itemconfig(
                    self.loading_text,
                    text="⚡ Initializing N21 CyberHacker...\n[EDUCATIONAL SIMULATION]",
                    fill=self.neon_cyan
                ))
            self.loading_window.after(120, self.glitch_loading_text)

    def show_login_screen(self):
        """Login screen with cyberpunk styling"""
        self.loading_window.destroy()
        self.login_window = tk.Toplevel(self.root)
        self.login_window.geometry("600x500+{}+{}".format(
            int(self.root.winfo_screenwidth()/2 - 300),
            int(self.root.winfo_screenheight()/2 - 250)
        ))
        self.login_window.configure(bg='#0a0a0a')
        self.login_window.overrideredirect(True)

        self.login_canvas = tk.Canvas(self.login_window, bg='#0a0a0a', highlightthickness=0)
        self.login_canvas.pack(fill='both', expand=True)
        self.login_canvas.create_rectangle(10, 10, 590, 490, outline=self.neon_cyan, width=4, dash=(5, 2))

        self.login_banner = self.login_canvas.create_text(
            300, 60,
            text="🔑 N21 CyberHacker Login",
            font=("Consolas", 22, "bold"),
            fill=self.neon_green
        )
        self.glitch_login_banner()

        self.login_canvas.create_text(120, 180, text="USER>", font=self.font, fill=self.neon_green, anchor='w')
        self.username_entry = tk.Entry(
            self.login_window,
            font=self.font,
            bg=self.dark_gray,
            fg=self.neon_green,
            insertbackground=self.neon_cyan,
            bd=0,
            width=30,
            relief='flat',
            highlightthickness=2,
            highlightbackground=self.neon_purple
        )
        self.login_canvas.create_window(180, 180, anchor='w', window=self.username_entry)

        self.login_canvas.create_text(120, 240, text="PASS>", font=self.font, fill=self.neon_green, anchor='w')
        self.password_entry = tk.Entry(
            self.login_window,
            font=self.font,
            bg=self.dark_gray,
            fg=self.neon_green,
            insertbackground=self.neon_cyan,
            show="*",
            bd=0,
            width=30,
            relief='flat',
            highlightthickness=2,
            highlightbackground=self.neon_purple
        )
        self.login_canvas.create_window(180, 240, anchor='w', window=self.password_entry)

        self.username_entry.insert(0, "nugra")
        self.password_entry.insert(0, "081328")

        self.login_btn = tk.Button(
            self.login_window,
            text="🔓 AUTHENTICATE",
            font=self.font,
            bg=self.neon_green,
            fg='black',
            bd=0,
            activebackground=self.neon_cyan,
            command=self.validate_login,
            width=20
        )
        self.login_canvas.create_window(300, 360, window=self.login_btn)
        self.pulse_buttons.append(self.login_btn)
        self.pulse_button(self.login_btn)

    def glitch_login_banner(self):
        """Glitch effect for login banner"""
        if not self.is_logged_in and self.login_window.winfo_exists():
            if random.random() < 0.5:
                glitch_text = ''.join(random.choice([c, chr(random.randint(33, 126))]) for c in "🔑 N21 CyberHacker Login")
                self.login_canvas.itemconfig(self.login_banner, text=glitch_text, fill=random.choice([self.neon_purple, self.neon_yellow, self.neon_cyan]))
                self.login_window.after(60, lambda: self.login_canvas.itemconfig(self.login_banner, text="🔑 N21 CyberHacker Login", fill=self.neon_green))
            self.login_window.after(100, self.glitch_login_banner)

    def pulse_button(self, button):
        """Pulse effect for buttons"""
        if button.winfo_exists() and (not self.is_running or button.cget("state") == 'normal'):
            button.configure(bg=self.neon_cyan if button.cget("bg") == self.neon_green else self.neon_green)
            self.root.after(400, lambda: self.pulse_button(button))

    def validate_login(self):
        """Validate login with animation"""
        username = self.username_entry.get().strip()
        password = self.password_entry.get().strip()
        if username == "nugra" and password == "081328":
            self.is_logged_in = True
            self.login_btn.configure(bg=self.neon_yellow, text="✅ ACCESS GRANTED")
            self.login_canvas.configure(bg=self.neon_green)
            self.login_window.update()
            time.sleep(0.3)
            self.pulse_buttons.remove(self.login_btn)
            self.login_window.destroy()
            self.setup_main_gui()
        else:
            self.login_btn.configure(bg=self.neon_red, text="❌ ACCESS DENIED")
            self.login_canvas.configure(bg=self.neon_red)
            self.login_window.update()
            time.sleep(0.2)
            self.login_canvas.configure(bg='#0a0a0a')
            self.login_btn.configure(text="🔓 AUTHENTICATE", bg=self.neon_green)
            messagebox.showerror("Login Failed", "Invalid credentials!", parent=self.login_window)

    def setup_main_gui(self):
        """Main GUI with fixed panels and interactive widgets"""
        self.root.deiconify()
        self.root.attributes('-fullscreen', True)

        self.main_canvas = tk.Canvas(self.root, bg='#0a0a0a', highlightthickness=0)
        self.main_canvas.pack(fill='both', expand=True)
        self.main_canvas.create_rectangle(
            20, 20,
            self.root.winfo_screenwidth()-20,
            self.root.winfo_screenheight()-20,
            outline=self.neon_cyan,
            width=4,
            dash=(5, 2)
        )

        self.animate_background()

        self.banner = self.main_canvas.create_text(
            self.root.winfo_screenwidth()/2, 50,
            text="🔑 N21 CyberHacker Simulator v3.0 [EDUCATIONAL SIMULATION]\nCreated by n21.were",
            font=("Consolas", 26, "bold"),
            fill=self.neon_green,
            justify='center'
        )
        self.glitch_banner()

        self.clock_label = tk.Label(
            self.main_canvas,
            text="",
            font=self.font,
            fg=self.neon_cyan,
            bg='#0a0a0a'
        )
        self.main_canvas.create_window(
            self.root.winfo_screenwidth()-100,
            30,
            anchor='ne',
            window=self.clock_label
        )
        self.update_clock()

        # Left Panel: Log Stream and Network Graph
        self.left_panel = tk.Frame(self.main_canvas, bg=self.solid_black, bd=0)
        self.main_canvas.create_window(30, 120, anchor='nw', window=self.left_panel)

        tk.Label(self.left_panel, text="📡 HACKER LOG STREAM", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        self.log_text = scrolledtext.ScrolledText(
            self.left_panel, height=15, width=50, font=self.font, bg=self.dark_gray, fg=self.neon_green,
            insertbackground=self.neon_green, wrap=tk.WORD, relief='flat', borderwidth=1, highlightthickness=2, highlightbackground=self.neon_cyan
        )
        self.log_text.pack(padx=10, pady=5, fill='x')
        self.log_text.insert(tk.END, "📡 Hacker Log Stream Initialized...\n")
        self.log_text.configure(state='disabled')

        tk.Label(self.left_panel, text="🌐 NETWORK ACTIVITY", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        self.graph_canvas = tk.Canvas(self.left_panel, width=300, height=150, bg=self.dark_gray, highlightthickness=2, highlightbackground=self.neon_cyan)
        self.graph_canvas.pack(padx=10, pady=5)
        self.graph_points = []
        self.update_graph()

        # Center Panel: Payload Generator and Attack Controls
        self.center_panel = tk.Frame(self.main_canvas, bg=self.solid_black, bd=0)
        self.main_canvas.create_window(
            self.root.winfo_screenwidth()/2, 120, anchor='n', window=self.center_panel
        )

        tk.Label(self.center_panel, text="💉 PAYLOAD GENERATOR", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        tk.Label(self.center_panel, text="TARGET_NAME>", font=self.font, fg=self.neon_green, bg=self.solid_black).pack(anchor='w', padx=10)
        self.nama_entry = tk.Entry(self.center_panel, font=self.font, bg=self.dark_gray, fg=self.neon_green, insertbackground=self.neon_cyan, bd=0, width=40, relief='flat', highlightthickness=2, highlightbackground=self.neon_purple)
        self.nama_entry.pack(anchor='w', padx=10, pady=2, fill='x')
        self.nama_entry.insert(0, "H4ck3r{random}")

        tk.Label(self.center_panel, text="TARGET_EMAIL>", font=self.font, fg=self.neon_green, bg=self.solid_black).pack(anchor='w', padx=10)
        self.email_entry = tk.Entry(self.center_panel, font=self.font, bg=self.dark_gray, fg=self.neon_green, insertbackground=self.neon_cyan, bd=0, width=40, relief='flat', highlightthickness=2, highlightbackground=self.neon_purple)
        self.email_entry.pack(anchor='w', padx=10, pady=2, fill='x')
        self.email_entry.insert(0, "ddos{random}@spam.net")

        tk.Label(self.center_panel, text="PAYLOAD_MSG>", font=self.font, fg=self.neon_green, bg=self.solid_black).pack(anchor='w', padx=10)
        self.pesan_entry = tk.Entry(self.center_panel, font=self.font, bg=self.dark_gray, fg=self.neon_green, insertbackground=self.neon_cyan, bd=0, width=40, relief='flat', highlightthickness=2, highlightbackground=self.neon_purple)
        self.pesan_entry.pack(anchor='w', padx=10, pady=2, fill='x')
        self.pesan_entry.insert(0, "{random}")

        tk.Label(self.center_panel, text="⚔️ ATTACK TYPE", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        attack_types = ["DDoS", "SQL Injection", "XSS", "Brute Force"]
        self.attack_menu = ttk.Combobox(self.center_panel, textvariable=self.attack_type, values=attack_types, state='readonly', font=self.font, width=20)
        self.attack_menu.pack(anchor='w', padx=10, pady=5)
        style = ttk.Style()
        style.configure('TCombobox', fieldbackground=self.dark_gray, background=self.neon_green, foreground='black', arrowsize=10)

        tk.Label(self.center_panel, text="🔥 ATTACK INTENSITY", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        self.intensity_slider = ttk.Scale(self.center_panel, from_=0, to=100, orient='horizontal', variable=self.attack_intensity, length=300)
        self.intensity_slider.pack(anchor='w', padx=10, pady=5)
        style.configure('TScale', background=self.solid_black, troughcolor=self.dark_gray, slidercolor=self.neon_green)

        tk.Label(self.center_panel, text="📈 ATTACK PROGRESS", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        self.progress = ttk.Progressbar(self.center_panel, length=300, mode='determinate', style='cyber.Horizontal.TProgressbar')
        self.progress.pack(anchor='w', padx=10, pady=5)
        style.configure('cyber.Horizontal.TProgressbar', troughcolor=self.dark_gray, background=self.neon_green, bordercolor=self.neon_cyan, lightcolor=self.neon_cyan, darkcolor=self.neon_cyan)

        # Right Panel: Terminal and Intel
        self.right_panel = tk.Frame(self.main_canvas, bg=self.solid_black, bd=0)
        self.main_canvas.create_window(
            self.root.winfo_screenwidth()-30, 120, anchor='ne', window=self.right_panel
        )

        tk.Label(self.right_panel, text="🔐 CYBERDECK TERMINAL", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        self.terminal = scrolledtext.ScrolledText(
            self.right_panel, height=20, width=50, font=self.font, bg=self.dark_gray, fg=self.neon_green,
            insertbackground=self.neon_green, wrap=tk.WORD, relief='flat', borderwidth=1, highlightthickness=2, highlightbackground=self.neon_cyan
        )
        self.terminal.pack(padx=10, pady=5, fill='x')
        self.terminal.insert(tk.END, "🔐 Cyberdeck Terminal Initialized...\n[EDUCATIONAL SIMULATION]\n")
        self.terminal.configure(state='disabled')

        tk.Label(self.right_panel, text="📊 HACKING INTEL", font=self.title_font, fg=self.neon_purple, bg=self.solid_black).pack(anchor='w', padx=10, pady=5)
        self.intel_text = scrolledtext.ScrolledText(
            self.right_panel, height=10, width=50, font=self.font, bg=self.dark_gray, fg=self.neon_green,
            insertbackground=self.neon_green, wrap=tk.WORD, relief='flat', borderwidth=1, highlightthickness=2, highlightbackground=self.neon_cyan
        )
        self.intel_text.pack(padx=10, pady=5, fill='x')
        self.intel_text.insert(tk.END, "📊 Intel Stream Initialized...\n")
        self.intel_text.configure(state='disabled')

        # Control Panel
        self.control_frame = tk.Frame(self.main_canvas, bg=self.solid_black, bd=0)
        self.main_canvas.create_window(
            self.root.winfo_screenwidth()/2, self.root.winfo_screenheight()-50, anchor='s', window=self.control_frame
        )
        self.start_btn = tk.Button(
            self.control_frame, text="⚡ INJECT PAYLOAD", font=self.font, bg=self.neon_green, fg='black',
            bd=0, activebackground=self.neon_cyan, command=self.start_attack, width=20
        )
        self.start_btn.pack(side='left', padx=10, pady=5)
        self.pulse_buttons.append(self.start_btn)
        self.pulse_button(self.start_btn)
        self.stop_btn = tk.Button(
            self.control_frame, text="🛑 TERMINATE", font=self.font, bg=self.neon_red, fg='black',
            bd=0, activebackground=self.neon_cyan, command=self.stop_attack, state='disabled', width=20
        )
        self.stop_btn.pack(side='left', padx=10, pady=5)
        self.pulse_buttons.append(self.stop_btn)
        self.pulse_button(self.stop_btn)

        # Terminal tags
        self.terminal.tag_configure('green', foreground=self.neon_green)
        self.terminal.tag_configure('red', foreground=self.neon_red)
        self.terminal.tag_configure('purple', foreground=self.neon_purple)
        self.terminal.tag_configure('yellow', foreground=self.neon_yellow)

    def animate_background(self):
        """Animated cyberpunk background"""
        if self.main_canvas.winfo_exists():
            self.main_canvas.delete("grid")
            offset = int(time.time() * 10 % 50)
            for x in range(-offset, int(self.root.winfo_screenwidth()), 50):
                self.main_canvas.create_line(x, 20, x, self.root.winfo_screenheight()-20, fill='#1a3c34', dash=(2, 4), tags="grid")
            for y in range(20-offset, int(self.root.winfo_screenheight()), 50):
                self.main_canvas.create_line(20, y, self.root.winfo_screenwidth()-20, y, fill='#1a3c34', dash=(2, 4), tags="grid")
            self.root.after(100, self.animate_background)

    def glitch_banner(self):
        """Glitch effect for banner"""
        if self.main_canvas.winfo_exists():
            if random.random() < 0.5:
                glitch_text = ''.join(random.choice([c, chr(random.randint(33, 126))]) for c in self.main_canvas.itemcget(self.banner, 'text'))
                self.main_canvas.itemconfig(self.banner, text=glitch_text, fill=random.choice([self.neon_purple, self.neon_yellow, self.neon_cyan]))
                self.root.after(50, lambda: self.main_canvas.itemconfig(
                    self.banner,
                    text="🔑 N21 CyberHacker Simulator v3.0 [EDUCATIONAL SIMULATION]\nCreated by n21.were",
                    fill=self.neon_green
                ))
            self.root.after(80, self.glitch_banner)

    def update_clock(self):
        """Update digital clock"""
        if self.root.winfo_exists():
            self.clock_label.configure(text=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            self.root.after(1000, self.update_clock)

    def update_graph(self):
        """Network activity graph"""
        if self.graph_canvas.winfo_exists():
            self.graph_canvas.delete("all")
            self.graph_canvas.create_rectangle(0, 0, 300, 150, outline=self.neon_cyan, width=2)
            points = [(0, 150)]
            for i in range(1, 20):
                x = i * 15
                y = 150 - random.randint(20, 120) * (self.attack_intensity.get() / 100) if self.is_running else 150
                points.append((x, y))
            self.graph_points = points[-20:]
            self.graph_canvas.create_line(points, fill=self.neon_green, width=3, smooth=True)
            self.graph_canvas.create_text(150, 20, text=f"Load: {int(self.attack_intensity.get())}%", font=self.font, fill=self.neon_cyan)
            self.root.after(150, self.update_graph)

    def animate_log_stream(self):
        """Log stream with attack-specific logs"""
        if self.is_running and self.log_text.winfo_exists():
            attack_type = self.attack_type.get()
            logs = {
                "DDoS": f"[LOG] Flooding IP: {random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)} | PORT: {random.randint(1,65535)}",
                "SQL Injection": f"[LOG] Injecting SQL: ' OR 1=1 -- | DB: {random.choice(['mysql', 'postgres', 'sqlite'])}",
                "XSS": f"[LOG] Injecting XSS: <script>alert('Hacked!')</script> | Target: {random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
                "Brute Force": f"[LOG] Attempting password: {''.join(random.choice('abcdefghijklmnopqrstuvwxyz0123456789') for _ in range(8))} | User: admin"
            }
            log = logs.get(attack_type, "[LOG] Unknown attack type")
            self.log_text.configure(state='normal')
            self.log_text.insert(tk.END, log + "\n")
            self.log_text.configure(state='disabled')
            self.log_text.see(tk.END)
            self.root.after(int(100 / (self.attack_intensity.get() / 50)), self.animate_log_stream)

    def animate_terminal_flash(self):
        """Terminal flash effect"""
        if self.terminal.winfo_exists():
            self.terminal.configure(state='normal', bg=self.neon_green)
            self.root.update()
            time.sleep(0.02)
            self.terminal.configure(bg=self.dark_gray)
            self.terminal.configure(state='disabled')
            self.root.update()

    def animate_payload_highlight(self):
        """Payload highlight animation"""
        for _ in range(8):
            if not self.root.winfo_exists():
                break
            self.nama_entry.configure(bg=self.neon_yellow, fg=self.dark_gray)
            self.email_entry.configure(bg=self.neon_yellow, fg=self.dark_gray)
            self.pesan_entry.configure(bg=self.neon_yellow, fg=self.dark_gray)
            self.root.update()
            time.sleep(0.04)
            self.nama_entry.configure(bg=self.dark_gray, fg=self.neon_green)
            self.email_entry.configure(bg=self.dark_gray, fg=self.neon_green)
            self.pesan_entry.configure(bg=self.dark_gray, fg=self.neon_green)
            self.root.update()
            time.sleep(0.04)

    def generate_data(self):
        """Generate random form data"""
        nama = self.nama_entry.get().strip()
        email = self.email_entry.get().strip()
        pesan = self.pesan_entry.get().strip()

        if not nama or '{random}' in nama:
            nama = f'H4ck3r{random.randint(1000, 9999)}'
        if not email or '{random}' in email:
            email = f'ddos{random.randint(1000, 9999)}@spam.net'
        if not pesan or '{random}' in pesan:
            pesan = f'🧨 {self.attack_type.get()} Test Payload'

        return {'nama': nama, 'email': email, 'pesan': pesan}

    def update_intel(self, data, status_code):
        """Update hacking intel with attack-specific data"""
        if self.intel_text.winfo_exists():
            self.intel_text.configure(state='normal')
            self.intel_text.delete(1.0, tk.END)
            user_agent_version = random.randint(1, 9)
            user_agent = f"N21Bot{user_agent_version}"
            attack_type = self.attack_type.get()
            intel = (
                f"📊 Hacking Data Intel:\n"
                f"Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
                f"Attack Type: {attack_type}\n"
                f"Target Name: {data['nama']}\n"
                f"Target Email: {data['email']}\n"
                f"Payload: {data['pesan']}\n"
                f"HTTP Status: {status_code}\n"
                f"Method: {random.choice(['POST', 'GET', 'HEAD'])}\n"
                f"Intensity: {int(self.attack_intensity.get())}%\n"
                f"Headers: {{'User-Agent': '{user_agent}', 'X-Forwarded-For': '{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}'}}\n"
            )
            self.intel_text.insert(tk.END, intel)
            self.intel_text.configure(state='disabled')

    def troll_hacker_output(self, thread_name, status_code):
        """Attack-specific output messages"""
        attack_type = self.attack_type.get()
        if status_code == 200:
            msg = f"[{thread_name}] ❌ {attack_type} BLOCKED! Server defense active! (200 OK)"
            color = 'red'
        else:
            messages = {
                "DDoS": {
                    403: f"[{thread_name}] ✅ SUKSES FLOOD DDoS! 🔓 Firewall overwhelmed! (HTTP 403)",
                    404: f"[{thread_name}] ✅ SUKSES DDoS ENDPOINT! 🧬 Hidden route exposed! (HTTP 404)",
                    405: f"[{thread_name}] ✅ SUKSES DDoS SPAM! 🛠️ Method flooded! (HTTP 405)",
                    500: f"[{thread_name}] ✅ SUKSES CRASH SERVER! 🔥 System overloaded! (HTTP 500)"
                },
                "SQL Injection": {
                    403: f"[{thread_name}] ✅ SUKSES INJECT SQL! 🔓 DB exposed! (HTTP 403)",
                    404: f"[{thread_name}] ✅ SUKSES SQL QUERY! 🧬 Data extracted! (HTTP 404)",
                    405: f"[{thread_name}] ✅ SUKSES SQL EXPLOIT! 🛠️ Schema mapped! (HTTP 405)",
                    500: f"[{thread_name}] ✅ SUKSES CRASH DB! 🔥 SQL error triggered! (HTTP 500)"
                },
                "XSS": {
                    403: f"[{thread_name}] ✅ SUKSES INJECT XSS! 🔓 Script executed! (HTTP 403)",
                    404: f"[{thread_name}] ✅ SUKSES XSS PAYLOAD! 🧬 Client compromised! (HTTP 404)",
                    405: f"[{thread_name}] ✅ SUKSES XSS EXPLOIT! 🛠️ DOM manipulated! (HTTP 405)",
                    500: f"[{thread_name}] ✅ SUKSES CRASH CLIENT! 🔥 XSS triggered error! (HTTP 500)"
                },
                "Brute Force": {
                    403: f"[{thread_name}] ✅ SUKSES BRUTE FORCE! 🔓 Password cracked! (HTTP 403)",
                    404: f"[{thread_name}] ✅ SUKSES BRUTE ATTEMPT! 🧬 Credentials tested! (HTTP 404)",
                    405: f"[{thread_name}] ✅ SUKSES BRUTE LOGIN! 🛠️ Access gained! (HTTP 405)",
                    500: f"[{thread_name}] ✅ SUKSES OVERLOAD AUTH! 🔥 Server crashed! (HTTP 500)"
                }
            }
            msg = messages.get(attack_type, {}).get(status_code, f"[{thread_name}] ✅ SUKSES {attack_type}! 🔥 Payload delivered! (HTTP {status_code})")
            color = 'yellow'
        return msg, color

    def update_terminal(self, message, color):
        """Update terminal with animation"""
        if self.terminal.winfo_exists():
            self.terminal.configure(state='normal')
            self.terminal.insert(tk.END, message + "\n", color)
            self.terminal.configure(state='disabled')
            self.terminal.see(tk.END)
            logging.info(message)

    def update_progress(self):
        """Update progress bar based on intensity"""
        if self.is_running and self.progress.winfo_exists():
            current = self.progress['value']
            increment = self.attack_intensity.get() / 20
            if current >= 100:
                self.progress['value'] = 0
            else:
                self.progress['value'] += increment
            self.root.after(150, self.update_progress)

    def simulate_attack(self):
        """Attack simulation with intensity and type"""
        bot_count = int(self.attack_intensity.get() / 5) + 5
        threading.Thread(target=self.animate_log_stream, daemon=True).start()
        threading.Thread(target=self.update_progress, daemon=True).start()
        while not self.stop_event.is_set():
            for i in range(bot_count):
                if self.stop_event.is_set():
                    break
                thread_name = f"Bot-{i+1}"
                data = self.generate_data()
                self.request_count += 1
                self.update_status()

                if random.random() < 0.15:
                    msg = f"[{thread_name}] 🔥 CRITICAL {self.attack_type.get()} HIT! 💥 System compromised!"
                    color = 'purple'
                    self.error_count += 1
                    self.update_status()
                else:
                    status = random.choice([200, 403, 404, 405, 500])
                    msg, color = self.troll_hacker_output(thread_name, status)
                    if status != 200:
                        self.success_count += 1
                        self.update_status()
                        threading.Thread(target=self.animate_payload_highlight, daemon=True).start()
                        threading.Thread(target=self.animate_terminal_flash, daemon=True).start()
                        self.update_intel(data, status)
                    else:
                        self.error_count += 1
                        self.update_status()

                self.update_terminal(msg, color)
                self.root.update()
                time.sleep(random.uniform(0.03, 0.1) / (self.attack_intensity.get() / 50))

    def start_attack(self):
        """Start attack simulation"""
        if not self.is_running:
            self.is_running = True
            self.start_btn.configure(state='disabled')
            self.stop_btn.configure(state='normal')
            self.stop_event.clear()
            self.request_count = 0
            self.success_count = 0
            self.error_count = 0
            self.progress['value'] = 0
            self.update_status()
            self.terminal.configure(state='normal')
            self.terminal.delete(1.0, tk.END)
            self.terminal.insert(tk.END, f"🔐 {self.attack_type.get()} injection started! [EDUCATIONAL SIMULATION]\n", 'green')
            self.terminal.configure(state='disabled')
            threading.Thread(target=self.simulate_attack, daemon=True).start()

    def stop_attack(self):
        """Stop attack simulation"""
        if self.is_running:
            self.is_running = False
            self.stop_event.set()
            self.start_btn.configure(state='normal')
            self.stop_btn.configure(state='disabled')
            self.progress['value'] = 0
            self.update_terminal(f"🛑 {self.attack_type.get()} injection terminated!", 'red')
            self.log_text.configure(state='normal')
            self.log_text.insert(tk.END, "📡 Hacker Log Stream Paused...\n")
            self.log_text.configure(state='disabled')

    def update_status(self):
        """Update status indicators"""
        if not hasattr(self, 'status_frame'):
            self.status_frame = tk.Frame(self.right_panel, bg=self.solid_black)
            self.status_frame.pack(anchor='w', padx=10, pady=5, fill='x')
            self.status_labels = {
                'requests': tk.Label(self.status_frame, text="REQUESTS: 0", font=self.font, fg=self.neon_yellow, bg=self.solid_black),
                'success': tk.Label(self.status_frame, text="SUCCESS: 0", font=self.font, fg=self.neon_green, bg=self.solid_black),
                'errors': tk.Label(self.status_frame, text="ERRORS: 0", font=self.font, fg=self.neon_red, bg=self.solid_black)
            }
            for label in self.status_labels.values():
                label.pack(anchor='w', padx=5, pady=2)
        if self.status_frame.winfo_exists():
            self.status_labels['requests'].configure(text=f"REQUESTS: {self.request_count}")
            self.status_labels['success'].configure(text=f"SUCCESS: {self.success_count}")
            self.status_labels['errors'].configure(text=f"ERRORS: {self.error_count}")

if __name__ == "__main__":
    root = tk.Tk()
    app = CyberHackerSimulator(root)
    root.mainloop()                             