from app.config import settings


class ZapService:
    async def passive_scan(self, url: str) -> list[dict]:
        if not settings.enable_zap:
            return [
                {
                    "title": "ZAP integration disabled",
                    "severity": "Info",
                    "evidence": "ENABLE_ZAP=false",
                    "recommendation": "Enable ZAP for passive scanner findings during authorized demos.",
                }
            ]
        return [
            {
                "title": "ZAP endpoint configured",
                "severity": "Info",
                "evidence": settings.zap_api_url,
                "recommendation": "Connect ZAP API calls here for passive alerts and report enrichment.",
            }
        ]

