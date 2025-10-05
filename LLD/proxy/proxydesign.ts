// Subject interface - defines the common interface for RealSubject and Proxy
interface DatabaseService {
  query(sql: string): Promise<any[]>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

// RealSubject - the actual object that does the real work
class RealDatabaseService implements DatabaseService {
  private isConnected = false;

  async connect(): Promise<void> {
    console.log("🔌 Connecting to database...");
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.isConnected = true;
    console.log("✅ Connected to database");
  }

  async disconnect(): Promise<void> {
    console.log("🔌 Disconnecting from database...");
    this.isConnected = false;
    console.log("❌ Disconnected from database");
  }

  async query(sql: string): Promise<any[]> {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
    
    console.log(`🔍 Executing query: ${sql}`);
    // Simulate query execution
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock results based on query
    if (sql.toLowerCase().includes('users')) {
      return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    }
    return [{ id: 1, data: 'sample' }];
  }
}

// Proxy - controls access to the RealSubject
class DatabaseServiceProxy implements DatabaseService {
  private realService: RealDatabaseService | null = null;
  private queryCache = new Map<string, any[]>();
  private connectionPool: RealDatabaseService[] = [];

  // Lazy initialization - create real service only when needed
  private async getRealService(): Promise<RealDatabaseService> {
    if (!this.realService) {
      console.log("🚀 Proxy: Creating real database service");
      this.realService = new RealDatabaseService();
      await this.realService.connect();
    }
    return this.realService;
  }

  // Access control and caching
  async query(sql: string): Promise<any[]> {
    // Security check
    if (this.containsMaliciousContent(sql)) {
      throw new Error("🚫 Proxy: Malicious query detected and blocked");
    }

    // Check cache first
    const cacheKey = sql.toLowerCase().trim();
    if (this.queryCache.has(cacheKey)) {
      console.log("⚡ Proxy: Returning cached result");
      return this.queryCache.get(cacheKey)!;
    }

    // Get real service and execute query
    const service = await this.getRealService();
    const result = await service.query(sql);
    
    // Cache the result
    this.queryCache.set(cacheKey, result);
    console.log("💾 Proxy: Result cached");
    
    return result;
  }

  async connect(): Promise<void> {
    // Proxy handles connection lazily, so this is a no-op
    console.log("🔄 Proxy: Connection will be established when needed");
  }

  async disconnect(): Promise<void> {
    if (this.realService) {
      await this.realService.disconnect();
      this.realService = null;
      this.queryCache.clear();
      console.log("🧹 Proxy: Cleaned up resources");
    }
  }

  private containsMaliciousContent(sql: string): boolean {
    const maliciousPatterns = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER'];
    return maliciousPatterns.some(pattern => 
      sql.toUpperCase().includes(pattern)
    );
  }

  // Additional proxy functionality
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.queryCache.size,
      keys: Array.from(this.queryCache.keys())
    };
  }

  clearCache(): void {
    this.queryCache.clear();
    console.log("🧹 Proxy: Cache cleared");
  }
}

// Virtual Proxy Example - for expensive object creation
interface ExpensiveResource {
  process(data: string): string;
  getInfo(): string;
}

class ExpensiveResourceImpl implements ExpensiveResource {
  private data: string;

  constructor() {
    console.log("💰 Creating expensive resource (this takes time...)");
    // Simulate expensive initialization
    this.data = "Expensive data loaded";
  }

  process(data: string): string {
    return `Processed: ${data} with ${this.data}`;
  }

  getInfo(): string {
    return this.data;
  }
}

class VirtualProxy implements ExpensiveResource {
  private realResource: ExpensiveResourceImpl | null = null;

  process(data: string): string {
    if (!this.realResource) {
      console.log("🔄 Virtual Proxy: Creating real resource on demand");
      this.realResource = new ExpensiveResourceImpl();
    }
    return this.realResource.process(data);
  }

  getInfo(): string {
    if (!this.realResource) {
      return "Resource not yet initialized";
    }
    return this.realResource.getInfo();
  }
}

// Protection Proxy Example - access control
interface SecureDocument {
  read(): string;
  write(content: string): void;
}

class Document implements SecureDocument {
  private content = "Confidential document content";

  read(): string {
    return this.content;
  }

  write(content: string): void {
    this.content = content;
  }
}

class ProtectionProxy implements SecureDocument {
  private document: Document;
  private userRole: 'admin' | 'user' | 'guest';

  constructor(userRole: 'admin' | 'user' | 'guest') {
    this.document = new Document();
    this.userRole = userRole;
  }

  read(): string {
    if (this.userRole === 'guest') {
      throw new Error("🚫 Access denied: Guests cannot read documents");
    }
    console.log(`📖 Protection Proxy: ${this.userRole} reading document`);
    return this.document.read();
  }

  write(content: string): void {
    if (this.userRole !== 'admin') {
      throw new Error("🚫 Access denied: Only admins can write documents");
    }
    console.log("✏️ Protection Proxy: Admin writing document");
    this.document.write(content);
  }
}

// Usage examples
async function demonstrateProxyPattern() {
  console.log("=== Database Service Proxy Demo ===");
  
  const dbProxy = new DatabaseServiceProxy();
  
  try {
    // First query - will create real service and cache result
    console.log("\n1. First query:");
    await dbProxy.query("SELECT * FROM users");
    
    // Second identical query - will use cache
    console.log("\n2. Second identical query:");
    await dbProxy.query("SELECT * FROM users");
    
    // Different query
    console.log("\n3. Different query:");
    await dbProxy.query("SELECT * FROM products");
    
    // Malicious query - will be blocked
    console.log("\n4. Malicious query:");
    try {
      await dbProxy.query("DROP TABLE users");
    } catch (error) {
      console.log(error.message);
    }
    
    // Check cache stats
    console.log("\n5. Cache stats:", dbProxy.getCacheStats());
    
  } finally {
    await dbProxy.disconnect();
  }

  console.log("\n=== Virtual Proxy Demo ===");
  const virtualProxy = new VirtualProxy();
  
  console.log("Info before creation:", virtualProxy.getInfo());
  console.log("Processing data:", virtualProxy.process("test data"));
  console.log("Info after creation:", virtualProxy.getInfo());

  console.log("\n=== Protection Proxy Demo ===");
  
  const adminDoc = new ProtectionProxy('admin');
  const userDoc = new ProtectionProxy('user');
  const guestDoc = new ProtectionProxy('guest');
  
  // Admin can read and write
  console.log("Admin reading:", adminDoc.read());
  adminDoc.write("Updated by admin");
  
  // User can read but not write
  console.log("User reading:", userDoc.read());
  try {
    userDoc.write("Trying to update");
  } catch (error) {
    console.log(error.message);
  }
  
  // Guest cannot read
  try {
    guestDoc.read();
  } catch (error) {
    console.log(error.message);
  }
}

// Run the demonstration
demonstrateProxyPattern().catch(console.error);