import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { jd, resume, lang } = await request.json();

  // Simulate 2-second analysis delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const report = {
    lang: lang || "en",
    jdAnalysis: {
      L1_公司背景: [
        "某头部互联网公司，主营电商与云计算业务",
        "全球员工超过10万人，技术团队占比60%以上",
        "业务覆盖200+国家和地区",
        "近年重点布局AI与大数据方向",
      ],
      L2_岗位职责: [
        "负责核心业务系统的架构设计与技术选型",
        "主导高并发场景下的性能优化与稳定性保障",
        "参与技术方案评审，推动团队代码质量提升",
        "指导初中级工程师成长，建设技术梯队",
      ],
      L3_技能要求: [
        "精通Java/Go至少一门语言，熟悉微服务架构",
        "具备高并发、高可用系统设计经验",
        "熟悉MySQL、Redis、Kafka等中间件",
        "了解Docker、K8s等容器化技术",
        "有分布式系统开发经验者优先",
      ],
      L4_隐含期望: [
        "期望候选人有业务Owner意识，能主动推动项目",
        "重视工程化思维，关注代码可维护性",
        "偏好有开源贡献或技术博客的候选人",
        "希望候选人具备跨团队协作与沟通能力",
      ],
    },
    idealResume: {
      name: "理想候选人画像",
      experience: [
        "5年+Java后端开发经验，主导过日活千万级系统的架构升级，QPS从5000提升至50000",
        "在某头部互联网公司负责电商核心交易链路优化，将订单处理延迟从200ms降至45ms",
        "带领5人团队完成微服务拆分，将单体应用拆分为12个独立服务，部署效率提升300%",
        "设计并落地全链路压测体系，提前发现并修复23个潜在性能瓶颈",
      ],
      skills: [
        "Java/Go",
        "Spring Cloud",
        "MySQL调优",
        "Redis集群",
        "Kafka",
        "Docker/K8s",
        "DDD",
        "系统设计",
      ],
      projects: [
        "某电商平台交易系统: 参与核心交易链路重构，使用DDD思想重新建模订单域，支持秒杀场景下的高并发写入",
        "实时数据同步平台: 基于Canal+Kafka实现MySQL到ES的实时数据同步，延迟<50ms，日均处理10亿+条数据",
        "开源项目贡献: 为Apache ShardingSphere贡献PR 5个，修复分片键路由Bug获社区认可",
      ],
      education: "计算机相关专业硕士及以上学历，或本科+ACM/开源项目等突出经历",
    },
    matchScore: {
      overall: 62,
      dimensions: [
        { name: "工作经历", score: 78, color: "warning" },
        { name: "技能匹配", score: 62, color: "warning" },
        { name: "项目经验", score: 35, color: "danger" },
        { name: "教育背景", score: 100, color: "success" },
      ],
    },
    gaps: [
      {
        description: "缺少高并发系统设计经验",
        severity: "high" as const,
        yourContent: "负责公司内部管理系统开发，日均请求量约1000次",
        expectedContent: "具备高并发场景设计经验，日活千万级系统架构能力",
        aiInsight:
          "你在校期间做过数据库课程设计，可以从'处理高并发查询'角度重新包装。如果有压测数据可以附上",
      },
      {
        description: "缺少微服务架构实战经验",
        severity: "high" as const,
        yourContent: "使用Spring Boot开发单体应用，熟悉RESTful API设计",
        expectedContent: "精通微服务架构，有服务拆分、治理、监控的完整落地经验",
        aiInsight:
          "你的Spring Boot项目如果有模块化设计，可以描述为'基于服务化思想设计的模块化架构'，同时建议补充Docker部署经验",
      },
      {
        description: "项目影响力不够突出",
        severity: "medium" as const,
        yourContent: "参与公司OA系统开发，负责请假审批模块",
        expectedContent: "主导过有业务影响力的项目，有量化成果",
        aiInsight:
          "即使是OA系统，也可以量化：'优化审批流程，将平均审批时长从2天缩短至4小时，服务2000+员工'",
      },
      {
        description: "缺少中间件深度使用经验",
        severity: "medium" as const,
        yourContent: "使用MySQL进行数据存储，了解Redis缓存基本用法",
        expectedContent: "熟悉MySQL调优、Redis集群、Kafka等中间件的生产级应用",
        aiInsight:
          "简历中补充你使用Redis的场景和数据量级，如'使用Redis缓存热点数据，命中率95%+，降低DB压力60%'",
      },
      {
        description: "技术影响力不足",
        severity: "low" as const,
        yourContent: "无开源贡献或技术分享记录",
        expectedContent: "有开源贡献或技术博客，体现持续学习和技术热情",
        aiInsight:
          "可以从今天开始写技术博客，总结你解决过的技术问题。即使1-2篇高质量文章也能加分",
      },
      {
        description: "教育背景匹配",
        severity: "low" as const,
        yourContent: "计算机科学与技术硕士",
        expectedContent: "计算机相关专业硕士及以上",
        aiInsight: "教育背景完全匹配，这是你的优势项，可以放在简历头部突出展示",
      },
    ],
    suggestions: [
      {
        problem: "项目成果缺乏量化数据",
        suggestion: "用具体数字描述你的工作成果，包括性能提升、效率改进、业务指标等",
        example:
          "原：'负责系统性能优化'\n改：'主导系统性能优化，将API平均响应时间从800ms降至120ms，P99延迟从2.1s降至350ms'",
        impact: "JD偏好数据驱动的候选人，量化成果能提升匹配度约27%",
      },
      {
        problem: "技术栈描述过于笼统",
        suggestion: "对于每项技术，补充使用场景、深度和规模",
        example:
          "原：'熟悉Redis'\n改：'使用Redis Cluster构建分布式缓存，管理20+节点集群，日均处理5000万次读写，设计缓存穿透/击穿防护策略'",
        impact: "明确的技术深度描述让面试官快速判断你的能力层级",
      },
      {
        problem: "缺少系统设计能力的体现",
        suggestion: "在项目描述中体现架构决策和设计权衡",
        example:
          "原：'开发了订单管理系统'\n改：'设计订单管理系统架构，采用CQRS模式分离读写，支撑日均10万+订单的创建与查询，系统可用性99.99%'",
        impact: "JD明确要求系统设计能力，这是核心考察点",
      },
      {
        problem: "团队协作描述缺失",
        suggestion: "补充跨团队协作、指导他人的经历",
        example:
          "原：'独立完成前端页面开发'\n改：'与产品、QA、运维团队协作完成项目交付，主导技术方案评审3次，指导2名实习生完成开发任务'",
        impact: "JD隐含期望中提到了跨团队协作和团队建设能力",
      },
      {
        problem: "个人品牌建设",
        suggestion: "开始积累技术影响力，写博客或参与开源",
        example:
          "在掘金/知乎发布3篇技术文章，如：《从0到1搭建生产级Redis集群》《高并发场景下的MySQL调优实战》",
        impact: "有技术影响力的候选人在初筛阶段通过率提升40%+",
      },
    ],
    optimizedResume: {
      header: "张三 · 高级Java开发工程师 · 计算机硕士 · 3年经验",
      sections: [
        {
          title: "工作经历",
          items: [
            "【某科技有限公司】Java开发工程师 (2022.06 - 至今)",
            "• 主导内部管理系统架构优化，将API平均响应时间从800ms降至120ms，P99延迟从2.1s降至350ms，支撑日均1万+请求",
            "• 设计并实现基于Redis Cluster的分布式缓存方案，缓存命中率95%+，降低数据库压力60%，日均处理500万次读写",
            "• 使用DDD思想重构订单模块，实现读写分离，系统可用性提升至99.95%",
            "• 与产品、QA、运维团队协作完成3个重点项目交付，主导技术方案评审，指导2名实习生",
          ],
        },
        {
          title: "项目经验",
          items: [
            "【企业OA管理系统】后端负责人 | Spring Boot + MySQL + Redis + Docker",
            "• 设计基于服务化思想的模块化架构，支持请假、报销、审批等12个业务模块独立部署",
            "• 优化审批流程引擎，将平均审批时长从2天缩短至4小时，服务2000+员工，日均处理300+审批单",
            "• 引入Redis缓存热点审批规则，DB查询减少60%，高峰期系统响应时间<200ms",
            "【实时数据看板】技术负责人 | Spring Boot + Kafka + WebSocket",
            "• 搭建基于Kafka的数据实时同步管道，实现业务数据毫秒级推送至前端看板",
            "• 使用WebSocket实现服务端推送，支持200+并发连接，系统稳定运行12个月无宕机",
          ],
        },
        {
          title: "技术能力",
          items: [
            "编程语言: Java (精通), Go (熟悉), Python (了解)",
            "框架: Spring Boot/Cloud, MyBatis, Netty",
            "中间件: MySQL (调优), Redis Cluster (20+节点), Kafka, RocketMQ",
            "运维: Docker, K8s (熟悉), Jenkins CI/CD, Prometheus + Grafana",
            "其他: DDD, 系统设计, 性能调优, 技术方案撰写",
          ],
        },
        {
          title: "教育背景",
          items: ["计算机科学与技术 硕士 | XX大学 (2020.09 - 2023.06)", "GPA: 3.8/4.0 | 校级优秀毕业生"],
        },
      ],
    },
  };

  return NextResponse.json(report);
}
