'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Target, TrendingDown, Zap, CheckCircle2 } from 'lucide-react';
import type { UserData } from '@/lib/health-calculator';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(-1);
  const [formData, setFormData] = useState<Partial<UserData>>({});

  const handleNext = () => {
    if (step < 9) {
      setStep(step + 1);
    } else {
      // Salvar dados e ir para dashboard
      localStorage.setItem('userData', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateFormData = (field: keyof UserData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    switch (step) {
      case 0: return formData.nome && formData.nome.length > 0;
      case 1: return formData.idade && formData.idade > 0;
      case 2: return formData.genero;
      case 3: return formData.peso && formData.peso > 0;
      case 4: return formData.altura && formData.altura > 0;
      case 5: return formData.objetivo;
      case 6: return formData.nivelAtividade;
      case 7: return formData.experienciaExercicio;
      case 8: return formData.horasDisponiveisExercicio && formData.horasDisponiveisExercicio > 0;
      case 9: return true; // Restrições são opcionais
      default: return false;
    }
  };

  if (step === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Transforme seu corpo em 90 dias
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Seu Plano Personalizado de
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Saúde e Emagrecimento</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra exatamente o que você precisa mudar para alcançar o corpo dos seus sonhos. 
              Análise completa em apenas 2 minutos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Plano Personalizado</h3>
                  <p className="text-sm text-gray-600">Exercícios e dieta adaptados ao seu perfil</p>
                </CardContent>
              </Card>

              <Card className="border-teal-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tracking Completo</h3>
                  <p className="text-sm text-gray-600">Monitore passos, calorias e progresso</p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Resultados Reais</h3>
                  <p className="text-sm text-gray-600">Método comprovado por milhares de pessoas</p>
                </CardContent>
              </Card>
            </div>

            <div className="pt-8">
              <Button 
                onClick={() => setStep(0)}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Começar Minha Transformação - Saúde IA
                <CheckCircle2 className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">✓ Sem cartão de crédito • ✓ Resultado imediato</p>
            </div>

            {/* Social Proof */}
            <div className="pt-12 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Mais de 50.000 pessoas já transformaram seus corpos</p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">-12kg</div>
                  <div className="text-xs text-gray-500">Média de perda</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">90 dias</div>
                  <div className="text-xs text-gray-500">Tempo médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">4.9★</div>
                  <div className="text-xs text-gray-500">Avaliação média</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const questions = [
    {
      title: 'Qual é o seu nome?',
      description: 'Vamos personalizar sua experiência',
      content: (
        <div className="space-y-4">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            placeholder="Digite seu nome"
            value={formData.nome || ''}
            onChange={(e) => updateFormData('nome', e.target.value)}
            className="text-lg p-6"
          />
        </div>
      )
    },
    {
      title: 'Qual é a sua idade?',
      description: 'Isso nos ajuda a calcular suas necessidades metabólicas',
      content: (
        <div className="space-y-4">
          <Label htmlFor="idade">Idade (anos)</Label>
          <Input
            id="idade"
            type="number"
            placeholder="Ex: 30"
            value={formData.idade || ''}
            onChange={(e) => updateFormData('idade', parseInt(e.target.value))}
            className="text-lg p-6"
          />
        </div>
      )
    },
    {
      title: 'Qual é o seu gênero?',
      description: 'Homens e mulheres têm necessidades metabólicas diferentes',
      content: (
        <RadioGroup value={formData.genero} onValueChange={(value) => updateFormData('genero', value)}>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="masculino" id="masculino" />
              <Label htmlFor="masculino" className="cursor-pointer flex-1 text-lg">Masculino</Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="feminino" id="feminino" />
              <Label htmlFor="feminino" className="cursor-pointer flex-1 text-lg">Feminino</Label>
            </div>
          </div>
        </RadioGroup>
      )
    },
    {
      title: 'Qual é o seu peso atual?',
      description: 'Seja honesto, isso é fundamental para seu plano',
      content: (
        <div className="space-y-4">
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            id="peso"
            type="number"
            step="0.1"
            placeholder="Ex: 75.5"
            value={formData.peso || ''}
            onChange={(e) => updateFormData('peso', parseFloat(e.target.value))}
            className="text-lg p-6"
          />
        </div>
      )
    },
    {
      title: 'Qual é a sua altura?',
      description: 'Usaremos para calcular seu IMC e peso ideal',
      content: (
        <div className="space-y-4">
          <Label htmlFor="altura">Altura (metros)</Label>
          <Input
            id="altura"
            type="number"
            step="0.01"
            placeholder="Ex: 1.75"
            value={formData.altura || ''}
            onChange={(e) => updateFormData('altura', parseFloat(e.target.value))}
            className="text-lg p-6"
          />
        </div>
      )
    },
    {
      title: 'Qual é o seu objetivo principal?',
      description: 'Vamos criar um plano focado no que você quer alcançar',
      content: (
        <RadioGroup value={formData.objetivo} onValueChange={(value) => updateFormData('objetivo', value)}>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="perderPeso" id="perderPeso" />
              <Label htmlFor="perderPeso" className="cursor-pointer flex-1">
                <div className="font-semibold">Perder Peso</div>
                <div className="text-sm text-gray-500">Reduzir gordura corporal</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="ganharMassa" id="ganharMassa" />
              <Label htmlFor="ganharMassa" className="cursor-pointer flex-1">
                <div className="font-semibold">Ganhar Massa Muscular</div>
                <div className="text-sm text-gray-500">Aumentar músculos</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="definir" id="definir" />
              <Label htmlFor="definir" className="cursor-pointer flex-1">
                <div className="font-semibold">Definir o Corpo</div>
                <div className="text-sm text-gray-500">Reduzir gordura e manter músculos</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="manter" id="manter" />
              <Label htmlFor="manter" className="cursor-pointer flex-1">
                <div className="font-semibold">Manter o Peso</div>
                <div className="text-sm text-gray-500">Manter forma atual e saúde</div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      )
    },
    {
      title: 'Qual é o seu nível de atividade física atual?',
      description: 'Seja realista sobre sua rotina atual',
      content: (
        <RadioGroup value={formData.nivelAtividade} onValueChange={(value) => updateFormData('nivelAtividade', value)}>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="sedentario" id="sedentario" />
              <Label htmlFor="sedentario" className="cursor-pointer flex-1">
                <div className="font-semibold">Sedentário</div>
                <div className="text-sm text-gray-500">Pouco ou nenhum exercício</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="leve" id="leve" />
              <Label htmlFor="leve" className="cursor-pointer flex-1">
                <div className="font-semibold">Levemente Ativo</div>
                <div className="text-sm text-gray-500">Exercício leve 1-3 dias/semana</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="moderado" id="moderado" />
              <Label htmlFor="moderado" className="cursor-pointer flex-1">
                <div className="font-semibold">Moderadamente Ativo</div>
                <div className="text-sm text-gray-500">Exercício moderado 3-5 dias/semana</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="intenso" id="intenso" />
              <Label htmlFor="intenso" className="cursor-pointer flex-1">
                <div className="font-semibold">Muito Ativo</div>
                <div className="text-sm text-gray-500">Exercício intenso 6-7 dias/semana</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="muitoIntenso" id="muitoIntenso" />
              <Label htmlFor="muitoIntenso" className="cursor-pointer flex-1">
                <div className="font-semibold">Extremamente Ativo</div>
                <div className="text-sm text-gray-500">Atleta ou trabalho físico pesado</div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      )
    },
    {
      title: 'Qual é a sua experiência com exercícios?',
      description: 'Vamos ajustar a intensidade do seu treino',
      content: (
        <RadioGroup value={formData.experienciaExercicio} onValueChange={(value) => updateFormData('experienciaExercicio', value)}>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="iniciante" id="iniciante" />
              <Label htmlFor="iniciante" className="cursor-pointer flex-1">
                <div className="font-semibold">Iniciante</div>
                <div className="text-sm text-gray-500">Pouca ou nenhuma experiência</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="intermediario" id="intermediario" />
              <Label htmlFor="intermediario" className="cursor-pointer flex-1">
                <div className="font-semibold">Intermediário</div>
                <div className="text-sm text-gray-500">Treino regular há alguns meses</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors cursor-pointer">
              <RadioGroupItem value="avancado" id="avancado" />
              <Label htmlFor="avancado" className="cursor-pointer flex-1">
                <div className="font-semibold">Avançado</div>
                <div className="text-sm text-gray-500">Treino consistente há mais de 1 ano</div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      )
    },
    {
      title: 'Quanto tempo você pode dedicar aos exercícios por dia?',
      description: 'Seja realista com sua disponibilidade',
      content: (
        <div className="space-y-4">
          <Label htmlFor="horas">Horas disponíveis por dia</Label>
          <Input
            id="horas"
            type="number"
            step="0.5"
            placeholder="Ex: 1.5"
            value={formData.horasDisponiveisExercicio || ''}
            onChange={(e) => updateFormData('horasDisponiveisExercicio', parseFloat(e.target.value))}
            className="text-lg p-6"
          />
          <p className="text-sm text-gray-500">Recomendamos pelo menos 30 minutos (0.5 horas) por dia</p>
        </div>
      )
    },
    {
      title: 'Você tem alguma restrição ou condição de saúde?',
      description: 'Opcional, mas importante para sua segurança',
      content: (
        <div className="space-y-4">
          <Label htmlFor="restricoes">Restrições (opcional)</Label>
          <Textarea
            id="restricoes"
            placeholder="Ex: Problemas no joelho, hipertensão, diabetes..."
            value={formData.restricoes || ''}
            onChange={(e) => updateFormData('restricoes', e.target.value)}
            className="min-h-32 text-lg p-4"
          />
          <p className="text-sm text-gray-500">Sempre consulte um médico antes de iniciar um programa de exercícios</p>
        </div>
      )
    }
  ];

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pergunta {step + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl md:text-3xl text-gray-900">
              {currentQuestion.title}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {currentQuestion.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion.content}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6">
              {step > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Voltar
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                size="lg"
              >
                {step === questions.length - 1 ? 'Ver Meu Plano' : 'Próxima'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Seus dados estão seguros e privados</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Análise baseada em ciência e nutrição esportiva</span>
          </div>
        </div>
      </div>
    </div>
  );
}
