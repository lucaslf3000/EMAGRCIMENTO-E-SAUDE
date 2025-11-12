'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  Heart, 
  Target, 
  TrendingDown, 
  Droplets, 
  Footprints, 
  Flame,
  Clock,
  Dumbbell,
  Apple,
  CheckCircle2,
  ArrowRight,
  Zap,
  Trophy,
  Calendar
} from 'lucide-react';
import type { UserData, HealthMetrics, ExercisePlan } from '@/lib/health-calculator';
import { 
  gerarMetricas, 
  gerarPlanoExercicios, 
  gerarRecomendacoes 
} from '@/lib/health-calculator';

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [exercisePlan, setExercisePlan] = useState<ExercisePlan | null>(null);
  const [recomendacoes, setRecomendacoes] = useState<string[]>([]);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (!data) {
      router.push('/');
      return;
    }

    const parsedData: UserData = JSON.parse(data);
    setUserData(parsedData);

    const calculatedMetrics = gerarMetricas(parsedData);
    setMetrics(calculatedMetrics);

    const plan = gerarPlanoExercicios(parsedData);
    setExercisePlan(plan);

    const recs = gerarRecomendacoes(parsedData, calculatedMetrics);
    setRecomendacoes(recs);

    // Mostrar oferta após 3 segundos
    setTimeout(() => setShowOffer(true), 3000);
  }, [router]);

  if (!userData || !metrics || !exercisePlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Gerando seu plano personalizado...</p>
        </div>
      </div>
    );
  }

  const getIMCColor = (imc: number) => {
    if (imc < 18.5) return 'text-blue-600';
    if (imc < 25) return 'text-emerald-600';
    if (imc < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIMCBgColor = (imc: number) => {
    if (imc < 18.5) return 'bg-blue-100';
    if (imc < 25) return 'bg-emerald-100';
    if (imc < 30) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Olá, {userData.nome}!</h1>
          </div>
          <p className="text-emerald-100 text-lg">Seu plano personalizado está pronto 🎉</p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-emerald-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">IMC Atual</span>
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <div className={`text-3xl font-bold ${getIMCColor(metrics.imc)}`}>
                {metrics.imc.toFixed(1)}
              </div>
              <Badge className={`mt-2 ${getIMCBgColor(metrics.imc)} ${getIMCColor(metrics.imc)} border-0`}>
                {metrics.classificacaoIMC}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-teal-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Peso Ideal</span>
                <TrendingDown className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-teal-600">
                {metrics.pesoIdeal.min.toFixed(1)} - {metrics.pesoIdeal.max.toFixed(1)}kg
              </div>
              <p className="text-xs text-gray-500 mt-2">Faixa saudável para sua altura</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Calorias/Dia</span>
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600">
                {userData.objetivo === 'perderPeso' 
                  ? metrics.calorias.perderPeso 
                  : userData.objetivo === 'ganharMassa'
                  ? metrics.calorias.ganharMassa
                  : metrics.calorias.manutencao}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {userData.objetivo === 'perderPeso' && 'Para perda de peso'}
                {userData.objetivo === 'ganharMassa' && 'Para ganho de massa'}
                {userData.objetivo === 'manter' && 'Para manutenção'}
                {userData.objetivo === 'definir' && 'Para definição'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Passos/Dia</span>
                <Footprints className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {metrics.passosDiarios.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-2">Meta diária recomendada</p>
            </CardContent>
          </Card>
        </div>

        {/* Métricas Secundárias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Água Diária</p>
                  <p className="text-2xl font-bold text-blue-600">{(metrics.agua / 1000).toFixed(1)}L</p>
                </div>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">0% do objetivo diário</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Apple className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Proteína Diária</p>
                  <p className="text-2xl font-bold text-purple-600">{metrics.proteina}g</p>
                </div>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">Essencial para seus músculos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Batimentos Repouso</p>
                  <p className="text-2xl font-bold text-red-600">{metrics.batimentosRepouso.min}-{metrics.batimentosRepouso.max}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">BPM ideal em repouso</p>
            </CardContent>
          </Card>
        </div>

        {/* Plano de Exercícios */}
        <Card className="border-emerald-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Seu Plano de Exercícios</CardTitle>
                <CardDescription>Personalizado para {userData.objetivo === 'perderPeso' ? 'perda de peso' : userData.objetivo === 'ganharMassa' ? 'ganho de massa' : userData.objetivo === 'definir' ? 'definição' : 'manutenção'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                <Calendar className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Frequência</p>
                  <p className="text-xl font-bold text-emerald-600">{exercisePlan.diasSemana}x/semana</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <Clock className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Duração</p>
                  <p className="text-xl font-bold text-teal-600">{exercisePlan.duracaoSessao} min</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                <Zap className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Intensidade</p>
                  <p className="text-xl font-bold text-orange-600">{exercisePlan.intensidade}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Tipos de Treino Recomendados</h3>
              <div className="flex flex-wrap gap-2">
                {exercisePlan.tipoTreino.map((tipo, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                    {tipo}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Exercícios do Seu Plano</h3>
              <div className="space-y-3">
                {exercisePlan.exercicios.map((exercicio, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{exercicio.nome}</h4>
                        <Badge variant="outline" className="text-xs">
                          {exercicio.calorias} kcal
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{exercicio.descricao}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exercicio.duracao} min
                        </span>
                        {exercicio.series && (
                          <span className="flex items-center gap-1">
                            <Dumbbell className="w-3 h-3" />
                            {exercicio.series} séries
                          </span>
                        )}
                        {exercicio.repeticoes && (
                          <span>{exercicio.repeticoes} repetições</span>
                        )}
                        <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                          {exercicio.tipo === 'cardio' ? 'Cardio' : exercicio.tipo === 'forca' ? 'Força' : 'Flexibilidade'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recomendações */}
        <Card className="border-teal-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Recomendações Personalizadas</CardTitle>
                <CardDescription>Siga estas orientações para melhores resultados</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recomendacoes.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA para Oferta */}
        {showOffer && (
          <Card className="border-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Zap className="w-4 h-4" />
                  Oferta Exclusiva por Tempo Limitado
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Transforme Seu Corpo em 90 Dias
                </h2>
                <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
                  Tenha acesso ao programa completo com acompanhamento profissional, 
                  planos de refeições personalizados e suporte 24/7
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button 
                    size="lg"
                    onClick={() => router.push('/oferta')}
                    className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold shadow-lg"
                  >
                    Ver Oferta Especial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-sm text-emerald-100">
                    ⚡ Apenas 47 vagas restantes hoje
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
